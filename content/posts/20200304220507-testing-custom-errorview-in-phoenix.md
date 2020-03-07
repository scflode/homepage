---
title: Testing custom ErrorView in Phoenix
date: 2020-03-04T22:01:42.715+00:00
tags:
- elixir
- phoenix
- exunit
categories:
- longs
- development
- programming
- testing

---
![](/uploads/2020/03/07/colton-sturgeon-TUSJWsPnnJ8-unsplash_1024.jpg)

## Create custom error pages

[Phoenix](http://phoenixframework.org) is a (the) web framework for [Elixir](https://elixir-lang.org). It enables rapid development on top of a functional programming language. It allows you to easily customize almost all aspects (no magic included) of its behaviors easily.

Whatsoever I have a project where I wanted to customize the error pages to be "rich". The `ErrorView` per default only renders a plain error message like `Page Not Found` or similar to the end user. When you have a scaffold like navigation, footer etc. around your pages this is a visual break for the user that might not be what you want. Phoenix does not use the layout when rendering these pages.

To enable Phoenix to render rich error pages it's pretty straightforward as of what you need to do.

Per default your `MyAppWeb.ErrorView` contains only one function:

```elixir {linenos=table}
  def template_not_found(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end
```

This handles all the errors from `400` to `599` or similar. There is the `Status` plug that has the standardized error messages that are displayed in plain text.

To get a custom template in there you need to add a function for it:

```elixir {linenos=table}
  def render("500.html", _assigns) do
    render("500_page.html")
  end
```

This f.e. will render this template for all `500` errors. Next we need to create this template under `my_app_web/templates/error/500_page.html.eex`and fill in the complete HTML code (including the `app.html.eex` part as this template is standalone).

> Do not name the template `500.html.eex` as this will end in an infinite loop.

When you want to use the `conn` within the template you need to pass the `assigns` though:

```elixir {linenos=table}
  def render("500.html", assigns) do
    render("500_page.html", assigns)
  end
```

> The `assigns` also contain the `conn` which then is accessible as usual via `@conn`.

You're done. Whenever a `500` error occurs this template is being rendered.

## Testing the changed ErrorView

Phoenix per default has the `ErrorView` test covered. These tests will now be broken as you changed the content.

The initial test looks like this:

```elixir {linenos=table}
  test "renders 500.html" do
    assert render_to_string(MyAppWeb.ErrorView, "500.html", [] ==
             "Internal Server Error"
  end
```

This is not the case anymore. At max the string is partially contained only but maybe you chose a complete different wording altogether.

A naive approach is to go the controller test way and change it to something like:

```elixir {linenos=table}
  test "renders 500.html" do
    assert render_to_string(MyAppWeb.ErrorView, "500.html", [] =~
             "Oh noes! Something went south."
  end
```

This might succeed if you have no assigns used in the template. You'd be done by now. Happy coding.

On the other hand in my case I have assets with `Routes.static_path()` parts referenced and also other assigns as the current user. The test needs to know about the `conn`.

Easy enough as the test case uses `MyApp.ConnCase`. We just need to inject the `conn` to the test:

```elixir {linenos=table}
  test "renders 500.html", %{conn: conn} do
    assert render_to_string(MyAppWeb.ErrorView, "500.html", conn: conn =~
             "Oh noes! Something went south."
  end
```

Hm... it does not seem to work (at least not for me). I got an error message like this:

```shell {linenos=table}
** (KeyError) key :phoenix_endpoint not found in: %{phoenix_recycled: true, plug_skip_csrf_protection: true}
```

Ahem... yes. Wah? The endpoint is assigned in the `use`d `ConnCase`. Weird. Searching the webs did not shed enough light into this. Until I saw something related to testing plugs itself ([Testing phoenix controller without an endpoint - Questions / Help - Elixir Forum](https://elixirforum.com/t/testing-phoenix-controller-without-an-endpoint/15377)).

So I ended up with something like this:

```elixir {linenos=table}
defmodule MyAppWeb.ErrorViewTest do
  use MyApp.DataCase, async: true
  use Plug.Test

  import MyApp.Fixtures

  setup do
    {:ok, user} = create_user_fixture()

    conn =
      conn(:get, "/something")
      |> Plug.Conn.put_private(:phoenix_endpoint, MyAppWeb.Endpoint)
      |> Plug.Test.init_test_session(current_user_id: user.id)

    {:ok, conn: conn, user: user}
  end

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 500.html", %{conn: conn, user: user} do
    assert render_to_string(MyAppWeb.ErrorView, "500.html",
             conn: conn,
             current_user: user
           ) =~
             "Oh noes! Something went south."
  end
end
```

## Conclusion

I don't know if this is the most clever approach (likely not 😅) but it works.

Phoenix and Elixir are reasonably easy to understand. The structure is clear and the codebases are clean. I often directly check the source code and although sometimes there is some scratching most of the time it's easy to understand. Great framework, great language. Hat tip to both!

Photo by [Colton Sturgeon](https://unsplash.com/@coltonsturgeon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/alchemy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)