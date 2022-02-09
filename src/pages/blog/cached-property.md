---
title: "How to save computation time with functools.cached_property?"
category: "Python"
createdAt: 2020-07-05
updatedAt: 2020-07-05
tags: ["Python", "functools", "performance"]
series:
status: published
featureImage:
sources:
---

The `cached_property` decorator can save a lot of computation time in return of some RAM memory.
Can this decorator be used anywhere, or should it be used sparingly? Let's find out!

<!--more-->

<BaseAlert type="star">

`cached_property` is added in Python 3.8

</BaseAlert>

# The test setup

In order to test the advantages in computation time I created a function that measures the time it takes to retrieve the property value.
It doesn't matter if you do not know how this function works. In short:

- It creates a new object of type `ClassWithProp` 10 times, where each time the `cached_property` will be cleared
- It gets the property value of each instance 10 times
- It puts all values in a Pandas dataframe, which makes it easier to get the mean of all values
- It prints the average time it takes to compute the property value the first time, the average time to retrieve the cached value, and the speed gain of using `cached_property`

```python
class ClassWithProp(Protocol):
    @property
    def prop(self) -> float:
        ...

def run_performance_test(type_with_prop: Type[ClassWithProp]):
    times_to_call_prop_per_run = 10

    runs = []
    # Run the same test 10 times
    for _ in range(10):
        class_with_prop = type_with_prop()
        times = []

        # Get the property value 10 times
        for _ in range(times_to_call_prop_per_run):
            start = time()
            result = class_with_prop.prop
            times.append(time() - start)

        runs.append(times)

    means = pd.DataFrame(
        runs, columns=[f"{i}" for i in range(times_to_call_prop_per_run)]
    ).mean()

    print(f"first run: {means[0]}")
    print(f"average other runs: {means[1:].mean()}")

    print(f"Speed gain: {means[0] / means[1:].mean()}")
```

# A simple computation

Let's begin with the simplest example I could come up with: A simple class with a single `prpperty` that will return a value of 1.

```python
>>> class SimpleComputation:
...    @property
...    def prop(self) -> float:
...        return 1

>>> run_performance_test(SimpleComputation)

first run: 5.960464477539062e-07
average other runs: 4.980299207899306e-07
Speed gain: 1.1968085106382977
```

As we can see, the speed gain is about 1, which is to be expected because we used `@property`.
Now let's see what happens when we use `@cached_property`

```python
>>> class SimpleComputation:
...    @cached_property
...    def prop(self) -> float:
...        return 1

>>> run_performance_test(SimpleComputation)

first run (calculated): 4.315376281738282e-06
average other runs (cached): 3.258387247721354e-07
Speed gain: 13.24390243902439
```

That is already over 10 times faster than before.
To be honest it was surprising to me since it is such a simple computation.

# A more complex computation

Using `@cached_property` on a simple computation, like returning `1`, is nice.
Now let's see what happens when it is used on a more complex computation?

```python
>>> class AdvancedComputation:
...    def __init__(self):
...        self.__values = [i for i in range(1_000_000)]
...
...    @property
...    def prop(self) -> float:
...        even_numbers = [i for i in self.__values if i % 2 == 0]
...
...        return sum(even_numbers) / len(even_numbers)

>>> run_performance_test(AdvancedComputation)

first run: 0.07410178184509278
average other runs: 0.06705078548855253
Speed gain: 1.105159041839175
```

Each run takes a lot longer than before, and there is no speed gain.
This was to be expected since the property value is not cached.
Now I hope you are in for a surprise because you are about to see the true power of `@cached_property`.

```python
>>> class AdvancedComputation:
...    def __init__(self):
...        self.__values = [i for i in range(1_000_000)]
...
...    @cached_property
...    def prop(self) -> float:
...        even_numbers = [i for i in self.__values if i % 2 == 0]
...
...        return sum(even_numbers) / len(even_numbers)

>>> run_performance_test(AdvancedComputation)

first run: 0.0791295051574707
average other runs: 1.7484029134114585e-07
Speed gain: 452581.63636363635
```

With `@cached_property` retrieving the value is almost half a million times faster. 😲
I don't know about you, but I think that is awesome.
Now imagine the performance gain when you cache values that come from a database or external api.

# When to avoid using `@cached_property`?

Do not use `@cached_property` when there are side effects inside the property,
or when the property might return a different value under certain circumstances.

# Conclusion

`@cached_propety` provides a huge performance boost when you are dealing with big calculations,
retrieving data from a database or calling an external API. All you have to look out for are side effects and mutable state.

<route lang="yaml">
meta:
  layout: home
</route>
