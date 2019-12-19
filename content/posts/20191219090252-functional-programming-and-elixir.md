---
title: '[WIP] Functional programming and Elixir'
date: 2019-12-19T08:34:59.239Z
draft: true
tags:
  - Elixir
  - functional programming
categories:
  - longs
  - development
---
When I started looking into functional programming the first time it was quite challenging. Coming from the OOP world it was (and still is at times) hard to fully grasp how to really do functional programming. It's not that it is in any way complicated it's just a different approach, a different paradigm.

What I take as essence from functional programming is that we as developers writing programs and applications are mainly converting data from A to B. There is input received and this input needs to be converted to an output.

Functional programming can easily feel like switching back to procedural programming. But it is not. There are constructs that make things just easier to understand. Data is immutable which is a big thing. Coming from OOP that does not mean that this is news. When you applied DDD or similar techniques there is also immutablility used as an important building block. 

The next part that is very appealing is composing of functions. This is partially only syntactic sugar but this makes the code so much more comprehensible. With objects and classes you can also achieve clarity when you for instance use DDD to describe the domain. It just feels that there is a bit more boilerplate needed.

A short example of functional composition in Elixir with the pipe operator:


{{< highlight scala "linenos=table" >}}
data
|> apply_one_transformation()
|> apply_another_transformation()
{{< / highlight >}}

This could also be written like this:

{{< highlight scala "linenos=table" >}}
apply_another_transformation(apply_one_transformation(data))
{{< / highlight >}}

As you can see that second representation is much harder to understand as you need to read inside out.
