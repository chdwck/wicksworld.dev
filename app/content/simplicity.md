---
title: Heresy - a case against prescribed patterns
createdAt: 2023-08-11T15:25:10.941Z
series: Kill the Evil Devlogs
---
I found clean code early on in my career. I read [Game Programming Patterns](https://gameprogrammingpatterns.com/), 
discovered [The Clean Code Blog](https://blog.cleancoder.com/), learned Java and C#. 
Then a colleague introduced me to Functional Programming and [Domain Driven Design](https://domaindrivendesign.org/ddd-domain-driven-design/).

Each time I learned a new pattern, I was sure that I found the perfect way to do things. My code would be clean and robust. It would be easy to 
understand and extend. I would be so great at my job, and would never lose it.

My code was often pretty to look at and it worked. But people (myself included) couldn't update it without refactoring some abstraction. 
I also still wrote bugs. Some of which were arcane and took minutes off my life. It could've been more performant too. If my code was clean than that means it was good. If it was good,
why was it such a pain to deal with?

I toiled to craft silver bullet after silver bullet.  I made invalid states almost impossible. I created near perfect encapsulations. After finding FP, 
I almost never mutated variables. I created HOCs that allowed for new implementations with almost no refactoring. I added helpful review comments to PRs 
to help my teammates write code that was almost reusable. I was almost a good programmer. The amount of time and performance I burned in the name of maintainable code pains me.

Fast forward to about a year and a half ago, I started working with a guy who claimed he didn't like patterns at all. He showed
me [grugbrain](https://grugbrain.dev/) and [Casey Muratori](https://www.youtube.com/@MollyRocket). He also completely shot down my brilliant data fetching pattern proposal.

After that, I discovered [@theprimeagen](https://www.youtube.com/@ThePrimeTimeagen) and [Brian Will](https://www.youtube.com/@briantwill) on youtube. 
I also discovered [John Carmack's inlined code emails](http://number-none.com/blow/john_carmack_on_inlined_code.html) and [Jonathan Blow](https://twitter.com/jonathan_blow).

I can sum up 95% of what I have learned of how they like to write code in Nike's iconic tagline. Instead I'll sum it up with what I have been telling myself 
every time I sense myself getting stuck in minutia. *Write the damn code*.

Kill the Evil started with OOP. I followed some tutorials from the wonderful [SimonDev](https://www.youtube.com/@simondev758) and used the patterns he did. I liked them at first. He used Finite State Machines and
proxy classes. Things made sense until I started on the combat system. Experimentation slowed. Old thought patterns began to swirl in my 
mind. *ICombatant? AttackManager? CombatantFSM? Battlefield?* I couldn't take it anymore. So much of my programming career has been wasted here. *Write the damn code.* In [this commit](https://github.com/chdwck/kill-the-evil/commit/9f43cea4c2259885bb7c1b452a7a3f4e1d8e00ab) I 
began to crack. 

The final straw was a quick performance test.
```js
class Foo {
  constructor(val) {
    this.value = val;
  }

  inc(val) {
    this.value += val;
  }
}

function createFoo(value) {
  return { value }
}

function incFoo(foo, value) {
  foo.value += value;
}

test('for loop poco', () => {
  const newarr = [];
  for (let i = 0; i < array.length; i++) {
    newarr.push(createFoo(i));
  }
  for (let i = 0; i < newarr.length; i++) {
    incFoo(newarr[i], i);
  }
});


test('for loop classes', () => {
  const newarr = [];
  for (let i = 0; i < array.length; i++) {
    newarr.push(new Foo(i));
  }
  for (let i = 0; i < newarr.length; i++) {
    newarr[i].inc(i)
  }
});

```
<figure>
 <img width="438" height="61" alt="Class vs Poco Test Results" src="class_vs_poco.webp" />
 <figcaption>Class vs Poco Test Results</figcaption>
</figure>

I cracked entirely.

I created global variables (they're gone now don't worry). I replaced `Hero` and `Skeleton` with `GameEntity`. I replaced managers and stores with hashmaps.
I replaced my favorite programming pattern, Finite State Machine, with if statements. The whole time I was sure that I was one file away from realizing my foolishness.

The result has been staggering. Experimentation is quick and easy. The code isn't pretty, but I understand exactly what it does. I have discovered a nameless pattern
of doing things that makes sense for this project. I create functions when it feels right. I make new files when it feels right. If a function needs another argument, 
I add another argument. Its dirty. Its heretical. Its damn fun.

In conclusion, the best programming pattern for a project is the one that happens. Improvable code is understandable code. Solve problems rather than adhere to doctrine. Be a heretic.

**Non Development Extra:**

I have reached this same conclusion in other aspects of my life as well. The easiest comparison to make is in martial arts, Brazilian Jiu-Jitsu and Muay Thai
to be exact. The longer I practice, the more I appreciate simplicity. I wouldn't have reached my current level without learning Berimbolo and Crucifix. However,
I have found that the bigger my opponent is, the simpler my technique becomes.  
