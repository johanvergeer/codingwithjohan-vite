---
title: 'SOLID Python part 3: Open Closed Principle'
category: 'Python'
createdAt: 2020-01-16
updatedAt: 2020-01-16
tags: ['SOLID', 'Python', 'OCP', 'Open-Closed Principle']
series: solid-python
status: published
featureImage:
sources:
---

## Open Closed Principle with Python

> SOFTWARE ENTITIES (CLASSES, MODULES, FUNCTIONS, ETC.) SHOULD BE OPEN FOR EXTENSION,
> BUT CLOSED FOR MODIFICATION. [@BMOOSC]

Modules that conform to the open-closed principle have two primary attributes.

1. **They are “Open For Extension”**. This means that the behavior of the module can be extended.
   That we can make the module behave in new and different ways as the requirements of the application change,
   or to meet the needs of new applications.
2. **They are “Closed for Modification”.** The source code of such a module is inviolate.
   No one is allowed to make source code changes to it.

In practice we often see that modules are changed when new behavior is required,
which violates the _OCP_. We want to have fixed behavior but still be flexible. :confused:
Let's see how these oppositions can work hand in hand.

### Open Closed Principle example

In this example we have an Orc attacking. Let's write some code.

```python
class Orc:
    def attack(self, weapon: str) -> None:
        if weapon == "sword":
            print("The orc swings the sword.")
        elif weapon == "bow":
            print("The orc shoots an arrow.")
        else:
            raise ValueError(f"The orc doesn't have a {weapon}")

azog = Orc()
azog.attack("sword")
```

This example breaks the **OCP** because when we want the orc to wield another weapon,
we would have to change the `attack` method.
A better approach would be to create a function for each weapon that is passed to and called by the `attack` method.

```python
class Orc:
    def attack(self, weapon: Callable) -> None:
        weapon()

def sword():
    print("The orc swings the sword.")

def bow():
    print("The orc shoots an arrow.")

azog = Orc()
azog.attack(sword)
```

Now all we have to do in order to let the Orc wield another weapon we have to create another function
and pass that function to the `attack` method.
