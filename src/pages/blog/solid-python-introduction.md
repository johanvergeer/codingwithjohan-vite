---
title: 'SOLID Python part 1: Introduction'
category: Python
createdAt: 2020-01-14
updatedAt: 2020-01-14
tags: ['SOLID', 'Python']
series: solid-python
status: published
featureImage:
sources:
  - title: Medium - Solid Design Principles
    url: https://medium.com/@trionamoynihan/solid-design-principles-eec367b2b8
  - title: Agile Software Development, Principles, Patterns, and Practices
    url: https://www.amazon.com/Software-Development-Principles-Patterns-Practices/dp/0135974445
---

SOLID is an acronym for the first five principles of Object-Oriented Design created by Robert C. Martin.
These principles help us to develop software that can be maintained and extended throughout its lifetime.
The SOLID principles do this by avoiding code smells, refactoring code and applying Agile Software Development.

<!--more-->

This article series provides insight into the SOLID principles and how they can be applied to Python.
In this first article we'll have a look at the reason we should apply the SOLID principles, some code smells, what technical debt is and how you can avoid it.

# Design Smells

Before we get started with the SOLID principles I would like to start with design smells
that will lead problems when we want to maintain, reuse or extend our software.

<block-quote author="Robert C. Martin" title="Agile Software Development, Principles, Patterns, and Practices">

<layout-two-columns>
  <template #col1>
    <ph-wall-fill width='50px' height='50px'></ph-wall-fill>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Rigidity</span> - The system is hard to change because every change forces many other changes to other parts of the system.
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <ic-sharp-wine-bar  width='50px' height='50px'></ic-sharp-wine-bar>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Fragility</span> - Changes cause the system to break in places that have no conceptual relationship to the part that was changed.
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <tabler-crane width='50px' height='50px'></tabler-crane>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Immobility</span> - It is hard to disentangle the system into components that can be reused in other systems.
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <carbon-currency-dollar width='50px' height='50px'></carbon-currency-dollar>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Viscosity</span> - Doing things right is harder than doing things wrong.
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <ph-brain width='50px' height='50px'></ph-brain>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Needless Complexity</span> - The design contains infrastructure that adds no direct benefit.
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <carbon-opacity width='50px' height='50px'></carbon-opacity>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Opacity</span> - It is hard to read and understand. It does not express its intent well.
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <carbon-repeat width='50px' height='50px'></carbon-repeat>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Needless Repetition</span> - The design contains repeating structures that could be unified under a single abstraction.
  </template>
</layout-two-columns>

</block-quote>

# Technical Debt

Allowing technical debt into your code might be a conscious decision, which is usually because of a deadline.
Whey we let technical debt grow consciously, we should also plan time after the release to clean up the code.

Technical debt can also grow because of a lack of knowledge, bad design and a lack of standards and common practices.

## Facts about technical debt

Here are some facts about technical debt to keep in mind:

<layout-two-columns>
  <template #col1>
    <carbon-hourglass width='50px' height='50px'></carbon-hourglass>
  </template>
  <template #col2>
    It will accumulate over time.
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <carbon-currency-dollar width='50px' height='50px'></carbon-currency-dollar>
  </template>
  <template #col2>
    It will increase the cost of change.
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <akar-icons-calendar width='50px' height='50px'></akar-icons-calendar>
  </template>
  <template #col2>
    It will decrease the responsiveness to your customer.
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <ph-skull width='50px' height='50px'></ph-skull>
  </template>
  <template #col2>
    It will kill your project if you don't keep it under control.
  </template>
</layout-two-columns>

## How to keep control of technical debt?

To keep control of technical debt there are three simple steps we can use:

<layout-two-columns>
  <template #col1>
    <carbon-code width='50px' height='50px'></carbon-code>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Step 1:</span> Write code. (Don't forget about the tests)
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <la-broom width='50px' height='50px'></la-broom>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Step 2:</span> Clean up code. (a.k.a. refactor code)
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <carbon-repeat width='50px' height='50px'></carbon-repeat>
  </template>
  <template #col2>
    <span class="font-bold text-blue-700">Step 3:</span> Repeat
  </template>
</layout-two-columns>

# Back to the SOLID principles

So why would we use the SOLID principles when we're working on our code?
Well, it helps us to write code that is ...

<layout-two-columns>
  <template #col1>
    <ph-brain width='50px' height='50px'></ph-brain>
  </template>
  <template #col2>
    ... easier to understand
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <fluent-top-speed-20-filled width='50px' height='50px'></fluent-top-speed-20-filled>
  </template>
  <template #col2>
    ... easier and faster to apply changes to
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <carbon-license-maintenance width='50px' height='50px'></carbon-license-maintenance>
  </template>
  <template #col2>
    ... better maintainable
  </template>
</layout-two-columns>

<layout-two-columns>
  <template #col1>
    <carbon-currency-dollar width='50px' height='50px'></carbon-currency-dollar>
  </template>
  <template #col2>
    ... more cost effective
  </template>
</layout-two-columns>
