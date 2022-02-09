---
title: "Multiple Inheritance and the Diamond Problem"
category: "Python"
createdAt: 2020-01-17
updatedAt: 2020-01-18
tags: ["Python"]
series:
status: published
featureImage: /blog/multiple-inheritance-and-the-diamond-problem/feature-image.png
sources:
  - title: Diamond inheritance on Wikipedia
    url: https://en.wikipedia.org/wiki/Multiple_inheritance#/media/File:Diamond_inheritance.svg
  - title: Photo by Holger Link on Unsplash
    url: https://unsplash.com/@photoholgic?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText
---

In this post, I will show you what multiple inheritance is, how you can use it and what to watch out for.
First you will learn about single and multiple inheritance and how you can use them in Python.
After this you will learn some multiple inheritance gotchas among which the dreaded diamond problem.

<!--more-->

# Basic class inheritance

Inheritance is a concept you will probably know when you work with an object oriented language.
Here is an example:

```python
class Parent:
    def __init__(self, x):
        self.x = x

    def __str__(self):
        return f"x: {self.x}"

class Child(Parent):
    pass

parent = Parent("Will")
child = Child("Jaden")
```

In this example the `Child` class inherits from the `Parent` class.
When you print the `parent` and `child` to the console you will see their behaviors.

```python
# And print both objects
>>> print(parent)
x: Will
>>> print(child)
x: Jaden
```

# Introduction to multiple inheritance

Python has a powerful multiple inheritance concept.
There are some things to look out for though, but I'll get to that later.

Let's see a multiple inheritance example:

```python
class Parent1:
    @property
    def x(self):
        return "X"

class Parent2:
    @property
    def y(self):
        return "y"

class Child(Parent1, Parent2):
    @property
    def z(self):
        return "Z"
```

Easy as that. The child class can inherit from as many base classes as you want.

Run this code to see the result:

```python
>>> child = Child()
>>> print(child.x)
X
>>> print(child.y)
Y
>>> print(child.z)
Z
```

## Parameters with multiple inheritance

The example above is nice, but wouldn't it be better if you could pass the name when you create an object?

In the next example you pass the names as parameters.
All three classes have an `__init__` method, and it is interesting to see what happens in the `Child` class
where you set the `y` attribute, and call `__init__` on `Mom` and `Dad`.

```python

class Parent1:
    def __init__(self, x):
        self.x = x

class Parent2:
    def __init__(self, y):
        self.y = y

class Child(Parent1, Parent2):
    def __init__(self, x, y, z):
        Parent1.__init__(self, x)
        Parent2.__init__(self, y)
        self.z = z
```

The result is the same, but you gained flexibility by using parameters.

```python
>>> child = Child("Jada", "Will", "Jaden")
>>> print(child.x)
Jada
>>> print(child.y)
Will
>>> print(child.z)
Jaden
```

# Multiple inheritance gotchas

Multiple inheritance in Python looks simple, and it is one of Pythons most powerful features.
You have to look out for gotchas that will lead to maintenance hell if you misuse or abuse it.

Here are some things you have to look out for when using multiple inheritance:

## Abusing multiple inheritance

Multiple inheritance should be looked at like any other design pattern.
So use it with care and only when applicable. There are often better solutions.

## Method resolution order

Python uses a resolution order to figure out which implementation to use.
When two or more parent classes have the same methods or attributes they will be resolved from left to right.

In the example below `Child` inherits from `Parent1` and `Parent2` which both have a method called `a(self)`.

```python
class Parent1:
    def __init__(self, x):
        self.x = x

    def a(self):
        print(self.x)

class Parent2:
    def __init__(self, y):
        self.y = y

    def a(self):
        print(self.y)

class Child(Parent1, Parent2):
    def __init__(self, x, y):
        Parent1.__init__(self, x)
        Parent2.__init__(self,y)
```

Because `Parent1` is used first, his implementation will be called. Run this code to see the result:

```python
>>> child = Child("Jada", "Will")
>>> print(child.a())
Jada
```

You can call `.__mro__` or `.mro()` on a class to figure out the resolution order.

```python
>>> Child.__mro__
(<class '__main__.Child'>, <class '__main__.Parent1'>, <class '__main__.Parent2'>, <class 'object'>)
>>> Child.mro()
(<class '__main__.Child'>, <class '__main__.Parent1'>, <class '__main__.Parent2'>, <class 'object'>)
```

## The diamond problem

The **diamond problem**, or **deadly diamond of death**,
occurs when multiple parent classes inherit from the same base class which makes the inheritance graph look like a diamond.

![Diamond Problem](/blog/multiple-inheritance-and-the-diamond-problem/diamond_inheritance.png)

When both class `A` and class `B` or `C` implemented the same methods, this will lead to trouble.

![I pity the fool that causes the diamond problem](/blog/multiple-inheritance-and-the-diamond-problem/i-pity-the-fool-that-causes-the-diamond-problem.jpg)

### Diamond problem example

Because it is so important I wanted to elaborate with an example:

```python
class GrandParent:
    def a(self):
        print("Diamond problem is bad, mmmmkay")

class Parent1(GrandParent):
    def __init__(self, x):
        self.x = x

    def a(self):
        print(self.x)

class Parent2(GrandParent):
    def __init__(self, y):
        self.y = y

    def a(self):
        print(self.y)

class Child(Parent1, Parent2):
    def __init__(self, x, y):
        Parent1.__init__(self, x)
        Parent2.__init__(self, y)
```

How do you think this will be resolved? Your first thought might be to follow the _left to right_ rule, but then you are wrong.

```python
>>> print(Child.__mro__)
(<class '__main__.Child'>, <class '__main__.Parent1'>, <class '__main__.Parent2'>, <class '__main__.GrandParent'>, <class 'object'>)
```

Now you see the first class in the mro is `Parent1` as you would expect, but next it is `Parent2` and lastly `GrandParent`,
which might not be what you expected.

# Conclusion

Multiple inheritance is a powerful Python feature.
Once you know how it works and when to use it you can do amazing things with it.
But on the other hand it can lead to some major issues you need to be aware of.
