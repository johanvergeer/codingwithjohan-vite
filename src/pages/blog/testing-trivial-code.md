---
title: 'Should trivial code be tested?'
category: 'Testing'
createdAt: 2021-01-01
updatedAt: 2021-01-01
tags: ['Testing']
series:
status: published
featureImage:
sources:
  - title: TechBeacon - Should you test trivial code?
    url: https://techbeacon.com/app-dev-testing/should-you-test-trivial-code
  - title: Codoid - Should trivial code be tested?
    url: https://techbeacon.com/app-dev-testing/should-you-test-trivial-code
  - title: Medium - Unit Testing, you're doing it wrong
    url: https://medium.com/@Cyrdup/unit-testing-youre-doing-it-wrong-407a07692989
  - title: Mark Seemann - Test trivial Code
    url: https://blog.ploeh.dk/2013/03/08/test-trivial-code/
  - title: Mark Seemann - What to test and what not to test
    url: https://blog.ploeh.dk/2018/11/12/what-to-test-and-not-to-test/
  - title: The Clean Code Blog - The Pragmatics of TDD
    url: http://blog.cleancoder.com/uncle-bob/2013/03/06/ThePragmaticsOfTDD.html
---

I recently got the following question: "Should I test trivial code?".
Since I knew this is a highly opinionated topic, I knew I had to do some research in order to come up with a proper answer.

So here are my two cents on the topic that seems to be coming back all the time.

<!--more-->

# What should we test?

We often test implementation details, but instead we should test whether the code we wrote reflects the use cases given by our users.

So what should we consider an implementation detail? From the viewpoint of a customer every line of code is an implementation detail.
From the viewpoint of a developer, anything that is not part of a public API can be considered an implementation detail.

Tests become brittle and have to be changed often when we test implementation details instead of use cases.

## Driving tests from use cases

When we drive our tests from use cases, and we describe them according to those use cases,
then we can prove to your customers that the production code we wrote actually does what it should.

As an added bonus clean tests also act as documentation for other developers and ourselves in the future.

### Example: implementing a use case

Just to start off with a very trivial use case example:

> Create an application that is only able to add positive whole numbers.
> When the application receives a negative number or zero, it should display an error.

<base-alert type=note>

Did you notice I used terms from the business domain like "positive whole numbers" instead of a Python keyword like `int`?
That is because use cases should be using business domain language, and not use any implementation details.

</base-alert>

Since we are good developers that follow TDD, we start by writing a test.

<block-quote author="Robert C. Martin">

"TDD is a discipline for programmers like double-entry bookkeeping is for accountants or sterile procedure is for surgeons."

</block-quote>

```python
def test_add_two_positive_numbers_returns_the_sum():
    assert add_positive_numbers(1, 1) == 2
```

<base-alert type=note>For these examples I'm using [pytest](https://docs.pytest.org/en/stable/)</base-alert>

Now the most basic implementation we can come up with:

```python
def add_positive_numbers(a: int, b: int) -> int:
    return a + b
```

At this moment you might say this code is so trivial, we shouldn't even bother testing it,
but we haven't covered all acceptance criteria yet.
The function doesn't throw a `ValueError` yet when either `a` or ` b` is a negative integer or zero.

So let's continue by writing some more tests.
(We shouldn't write all tests at once when we apply pure TDD, but I do now in order to keep this article a bit more pragmatic)

```python
@pytest.mark.parametrize(
  "a,b",
  [
    pytest.param(0, 1, id="first parameter should not be 0")
    pytest.param(1, 0, id="second parameter should not be 0")
    pytest.param(-1, 1, id="first parameter should not be a negative integer")
    pytest.param(1, -1, id="second parameter should not be a negative integer")
    pytest.param(-1, -1, id="Both parameters should not be a negative integer")
    pytest.param(0, 0, id="Both parameters should not be zero")
  ]
)
def test_add_with_negative_integer_or_zero_raises_value_error(a, b):
    with pytest.raises(ValueError):
        add_positive_numbers(a, b)
```

These tests will obviously fail at this moment, so let's change the implementation:

```python
def add_positive_numbers(a: int, b: int) -> int:
    if a > 0 and b > 0:
      return a + b
    raise ValueError("a and b must be positive integers!")
```

So now we have tested and implemented the use case using TDD
we can be sure that we have implemented the use case according to the acceptance criteria.
The best part is: we can prove to the customer that our code works.

When we write tests using TDD, an added bonus is that we get immediate feedback on the design of our production code.

# What is trivial code?

It would be nice if we can define "trivial code". This is already something that has lead to a lot of debate in our industry.
I don't think this debate will end with this article, but it can give you another point of view on the subject.

Let's take a look at this example:

```python
def add(a: float, b: float) -> float:
    return a + b
```

I think we can all agree that this is the most trivial (and useless 😉) piece of code I can come up with,
and it would seem ludicrous to write a test for this.

Some people say that functions that only contain a single line of code is considered trivial.
What about this one that checks whether an email address is [RFC 5322 compliant](http://emailregex.com/).
It is a valid single-line function, but I would never put this out there without writing a proper suite of tests.

```python
import re

def is_email_rfc5233_compliant(email: str) -> bool:
    return True if pattern.fullmatch("?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]", email) != None else False
```

Some also say that code is trivial when it has a [cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) of 1.
Again, in the regex example above, the code has a cyclomatic complexity of 1, but it is still something I would not consider to be trivial.

So what is trivial code? I don't think that can be answered with a simple sentence.
I even wonder whether in can be described in a whole book.
On the other hand, I don't even think it matters whether the code is trivial.
It matters whether we can assure the code does, and keeps doing, what it is supposed to.

Oh yeah, one more point I would like to make about trivial code: It might not stay trivial!

# Writing tests to mitigate risk

We don't write tests for the sake of writing tests.
We also don't write tests just to prove we implemented the use cases according to their acceptance criteria.
In the end write tests to mitigate risk, which consists of two parts: **Chance** and **Impact**.

For example: when you write a simple script to clean up some files on your computer you probably won't create a whole test suite for it.
You create the script, run it, and throw it away. The change something goes wrong is very small, and the impact when something goes wrong is very small as well. (If you created a backup)
So what is the point of writing tests for this one-off script.

On the other hand: I really hope tests are written for the software that's controlling the autopilot in modern cars.
After all, the chance of something going wrong in the busy traffic is very big, and the impact of an accident caused by an error can be huge.

## Writing tests to prevent regression

There are four reasons to change software:

<block-quote author="Michael C. Featers" title="Working Effectively with Legacy Code">

1. Adding a feature
1. Fixing a bug
1. Improving the design
1. Optimizing resource usage

</block-quote>

When our application is not tested properly, these changes might lead to [regressions](https://en.wikipedia.org/wiki/Software_regression).
I would consider regression also a form of risk, since it leads to errors or unexpected changes in the behavior of the system.

# When should you _not_ write tests?

It is just as important to know when not to write tests as it is to know when to write tests.
So let's have a look at that right now.

## Private functions

Private functions (or private methods) are not part of a public API and therefore they are implementation details.
They are tested through the public API.

## Prototyping

While we are fiddling around on a prototype it is often not wise to write tests immediately since the API is likely to change.
A new part of an application can also be a prototype in itself.
Just be sure the prototype is encapsulated and doesn't mess with the existing code.

For example: I was recently working on authentication and authorisation for an application with a framework I never used before.
So I started with fiddling around to figure out how things we supposed to be implemented.
Once I figured it out I threw most of it away, wrote some tests and implemented it properly.

## UI

Testing a UI is hard, and the tests tend to become very brittle.
It is often better to focus tests on the layer that is just beneath the UI.

If we take an example of a Vue component I wrote for this blog to display "previous" and "next" buttons on articles that are part of a series.
This component has the following requirements:

```js
// Omitted the test implementations for brevity
describe('ArticleSeriesPrevNext', () => {
  describe('an article with a future date is available in the series', () => {
    test('the button has a link to the next article', () => {})
    test('the button shows the title of the next article', () => {})
  })
  describe('no article with a future date is available in the series', () => {
    test('the "next" button is omitted', () => {})
  })
  describe('an article with a past date is available in the series', () => {
    test('the button has a link to the previous article', () => {})
    test('the button shows the title of the previous article', () => {})
  })
  describe('no article with a past date is available in the series', () => {
    test('the "previous" button is omitted', () => {})
  })
})
```

I have used [Jest](https://jestjs.io/en/) to write these requirements down.
After all, once all tests pass we know the component has correctly implemented the use case.

Here is the implementation, which is a [Nuxt Content](https://content.nuxtjs.org/) component.

```vue
<template>
  <div v-if="$fetchState.pending">
    Checking for other articles in the series...
  </div>
  <div v-else-if="$fetchState.error">
    Error occurred while checking for other articles in the series...
  </div>
  <div v-else-if="document.series">
    <div v-if="prev">
      <nuxt-link :to="{ name: 'blog-slug', params: { slug: prev.slug } }">
        {{ prev.title }}
      </nuxt-link>
    </div>
    <div v-if="next">
      <nuxt-link :to="{ name: 'blog-slug', params: { slug: next.slug } }">
        {{ next.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IHasSeries, IHasTitle } from '~/types/content'

interface ITitleAndSlug {
  title?: string
  slug?: string
}

@Component
export default class ArticleSeriesPrevNext extends Vue {
  @Prop() private document?: IContentDocument & IHasSeries
  private prev?: ITitleAndSlug = {}
  private next?: ITitleAndSlug = {}

  async fetch() {
    if (!this.document?.series) return // no need to do anything

    const [_prev, _next] = await this.$nuxt
      .$content('blog')
      .only(['title', 'slug'])
      .where({ series: this.document!.series! })
      .sortBy('createdAt', 'asc')
      .surround(this.document.slug)
      .fetch<IHasTitle>()

    this.prev = _prev
    this.next = _next
  }
}
</script>
```

Notice the tests don't say anything about the position, color or font of the rendered elements.
We just check whether the elements exist when they should and whether they have the right attributes.
We could write those tests, but they are hard to write, don't add a lot of value and are usually very brittle.

## "Simple" class attributes

Class attributes that are set through the constructor don't have to be tested separately.
Firstly it is very tedious and time-consuming. Secondly setting and getting attributes is often tested indirectly.

For example this `Person` class won't require any testing.

```python
class Person:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age
```

When we start to add some validation, it would be wise to add some tests since this is where we have some actual business logic.

```python
class Person:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age

    @property
    def age(self, value: int) -> None:
        if 0 < age < 130:
            raise ValueError("A person is should be between 0 and 130 years old")
        setattr(self, "__age", value)

    @age.getter
    def age(self) -> int:
        return getattr(self, "__age")
```

## One-shot programs

When we write a script that is used just one time and thrown away afterwards it doesn't make sense to write tests most of the time.

# Conclusion

The main question was: "Should trivial code be tested?" In order to answer this question we looked at what we should test and what can be considered trivial code.

From this we concluded it is very hard to determine what can be considered "trivial code", since this can be very subjective.
We also discussed that our tests should be driven by the use cases of our system and they should not focus on implementation details.
Finally, we finished by discussing what should not be covered by automated tests, which comes down to implementation details and UI.

I would like to finish with the following statement: "When in doubt: write a test"
