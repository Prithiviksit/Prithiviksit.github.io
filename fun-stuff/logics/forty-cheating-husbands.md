---
layout: fun-article
title: "Forty Cheating Husbands: What Silence Can Tell Us"
description: "A rigorous, approachable proof of the forty cheating husbands puzzle, and what delayed messages reveal about common knowledge, communication, and action."
group: Logics
subtitle: "A public announcement, thirty-nine silent nights, and the difference between knowing and knowing that others know."
lead: "Everyone already knows that somebody is unfaithful. Then the queen announces exactly that, and everything changes. What did she tell them that they did not already know?"
permalink: /fun-stuff/logics/forty-cheating-husbands.html
date: 2026-11-05T19:03:52-07:00
published: true
---

A town has forty unfaithful husbands.
Every wife knows which of the other husbands are unfaithful, but does not know whether her own husband is.
Nobody discusses the subject.

One day, the queen publicly announces that at least one husband is unfaithful.
She orders any wife who learns that her own husband is unfaithful to shoot him at the next midnight.

The first night passes in silence.
So does the second.
Nothing happens for thirty-nine nights.
On the fortieth night, all forty unfaithful husbands are shot.

This is the traditional puzzle studied by Yoram Moses, Danny Dolev, and Joseph Halpern in [*Cheating Husbands and Other Stories: A Case Study of Knowledge, Action, and Communication*](https://link.springer.com/article/10.1007/BF01661170).
Their paper uses variations on the story to investigate how communication determines what people can know and when they can act.

The puzzle has two questions.
Why forty nights?
And why does the queen's announcement matter when every wife already sees at least thirty-nine unfaithful husbands?

Both questions turn on the distinction between information that everyone has and information that is **common knowledge**.
That is also the central distinction in the companion article on [Aumann's agreement theorem](/fun-stuff/economics/aumann-agreement.html).
Here we can see it working without probabilities or preferences.

## The rules that make the puzzle work

There are $$N\geq 40$$ couples, and each husband's fidelity is fixed throughout the story.
The total number of couples is known, and each wife can see the status of every husband except her own.
Wait: if there are forty unfaithful husbands, doesn't a wife who sees thirty-nine already know about the fortieth?
No—**forty is given only to us, the readers.**
The queen never announces the number forty; she announces only that *at least one* husband is unfaithful.

To make the deduction exact, we assume the following common-knowledge rules:

- Every wife reasons flawlessly and obeys the queen's decree to the letter: she shoots her husband at the first midnight after she knows he is unfaithful, and never otherwise.
- Everyone hears the queen's truthful announcement together and knows that everyone hears it.
- Each midnight decision is simultaneous: no wife can wait to hear whether another shot goes off that same night before acting.
- Everyone can hear whether a night was silent and keeps track of how many nights have passed since the announcement.
- No one communicates or receives outside information about fidelity in any other way.

These rules—along with the observation structure and everyone's rationality—are common knowledge: everyone knows them, everyone knows that everyone knows them, and so on.
Notice that the wives only need to detect whether *any* shot was fired on a given night, not how many shots rang out or who fired them.

## Start with one husband

Imagine there is just one unfaithful husband.
His wife sees no unfaithful husband among the others.
The queen's announcement tells her that there is at least one, so it must be hers.
She acts on the first night.

Now suppose there are two unfaithful husbands, married to Alice and Beatrice.
Alice sees Beatrice's husband and thinks:

> If my husband were faithful, Beatrice would see no unfaithful husbands. The announcement would identify hers, and she would act tonight.

Beatrice reasons in the same way about Alice.
Neither can identify her own husband on the first day, so the first night is silent.
That silence rules out Alice's hypothesis that her husband is faithful.
It does the same for Beatrice.
Both act on the second night.

With three unfaithful husbands, each affected wife sees two.
If her own husband were faithful, those other two wives would face the two-husband case and act on the second night.
When the second night is silent, she rules out that possibility.
All three act on the third night.

Stepping through one, two, and three husbands shows the induction at work; we can make the general argument precise by tracking which possible worlds survive each silent night.

## A proof by eliminating possible worlds

**Claim.** If exactly $$k\geq 1$$ husbands are unfaithful, the first $$k-1$$ nights are silent, and all $$k$$ are shot on night $$k$$.
No faithful husband is ever shot.

Represent a possible world by the set of unfaithful husbands,

$$
H\subseteq\{1,\ldots,N\},
$$

where $$i\in H$$ means that husband $$i$$ is unfaithful.
Before the announcement, every subset is possible in the model.
Wife $$i$$ observes the status of everyone except husband $$i$$, so the two worlds she initially considers possible differ only in whether $$i$$ belongs to $$H$$.

The public announcement removes the empty set: there is at least one unfaithful husband.
Each silent night then eliminates the smallest remaining worlds.
Specifically, after the announcement and $$t$$ silent nights, the worlds consistent with the public history are

$$
\boxed{
\Omega_t
=\left\{H\subseteq\{1,\ldots,N\}:|H|\geq t+1\right\}.
}
$$

Here $$t=0$$ marks the moment after the announcement but before the first midnight.
Each wife intersects this public set $$\Omega_t$$ with what she personally sees of the other husbands.

At $$t=0$$, the formula holds because the queen's announcement rules out only $$H=\varnothing$$.

Now suppose the formula holds after $$t$$ silent nights, and consider a world $$H\in\Omega_t$$.
A wife whose husband is unfaithful has two candidate worlds that match what she sees of the other husbands:

1. Her husband is unfaithful, so the world is $$H$$.
2. Her husband is faithful, so the world is $$H\setminus\{i\}$$.

The second candidate survives in $$\Omega_t$$ if and only if

$$
|H|-1\geq t+1.
$$

Consequently, she can rule out her husband's fidelity—and therefore knows he is unfaithful—precisely when

$$
|H|=t+1.
$$

If the true world has exactly $$t+1$$ unfaithful husbands, every affected wife learns the truth after $$t$$ silent nights and shoots on night $$t+1$$.
If more than $$t+1$$ husbands are unfaithful, no affected wife can yet rule out $$H\setminus\{i\}$$, and wives of faithful husbands never rule out the true world $$H$$, so night $$t+1$$ passes in silence.

Shots therefore ring out on night $$t+1$$ in and only in the worlds with $$|H|=t+1$$.
When night $$t+1$$ is silent, those worlds are eliminated, leaving

$$
\Omega_{t+1}
=\left\{H\subseteq\{1,\ldots,N\}:|H|\geq t+2\right\}.
$$

By induction, in a world with $$k$$ unfaithful husbands, the first $$k-1$$ nights are silent and all $$k$$ affected wives act together on night $$k$$.

For forty husbands, the common knowledge builds night by night:

| Observation | What becomes common knowledge |
| --- | --- |
| The queen's announcement | At least one husband is unfaithful. |
| One silent night | At least two are unfaithful. |
| Two silent nights | At least three are unfaithful. |
| Thirty-eight silent nights | At least thirty-nine are unfaithful. |
| Thirty-nine silent nights | At least forty are unfaithful. |

A wife who sees thirty-nine unfaithful husbands initially considers two totals possible: thirty-nine and forty.
After thirty-eight silent nights, both remain open.
When the thirty-ninth night passes in silence, thirty-nine is ruled out—and she knows her husband is the fortieth.

## What did the queen actually add?

In the actual world, every wife already sees at least thirty-nine unfaithful husbands, so everyone already knows that at least one husband is unfaithful.
The queen's announcement adds no first-order fact.

What it changes is higher-order knowledge: knowing that others know, knowing that others know that others know, and so on.

To see how, start at the actual world with forty unfaithful husbands and pick an affected wife, say Wife 1.
Before the announcement, she considers it possible that her husband is faithful and only the other thirty-nine are unfaithful.
In that 39-husband world, Wife 2 considers it possible that her own husband is faithful too, leaving thirty-eight.
Following this chain of hypothetical worlds one wife at a time reaches all the way down to zero:

$$
40\;\longleftrightarrow\;39
\;\longleftrightarrow\;38
\;\longleftrightarrow\;\cdots
\;\longleftrightarrow\;1
\;\longleftrightarrow\;0.
$$

Each step swaps the status of a single husband and reflects his wife's uncertainty at that hypothetical world.
No wife in the forty-husband world thinks all husbands might be faithful, yet Wife 1 considers it possible that Wife 2 considers it possible ... that Wife 40 considers it possible that no husband is unfaithful.

As discussed in the [Aumann agreement article](/fun-stuff/economics/aumann-agreement.html#what-common-knowledge-adds), a proposition is common knowledge only if it holds at every world reachable through such a chain.
Before the announcement, the zero-husband world is reachable in forty steps, so the existence of an unfaithful husband is not common knowledge.

The queen's public announcement severs the end of the chain by deleting the zero-husband world from everyone's model at once.
Now the existence of an unfaithful husband holds at every reachable world, making it common knowledge and launching the thirty-nine-step induction.

## Why perfect reasoners still have to wait

If every wife can work through the entire induction in her head on the afternoon of the announcement, why does it still take forty days for anything to happen?

Because deducing a conditional is not the same as observing whether its antecedent holds.
On the first afternoon, an affected wife already knows both conditionals:

- *If* my husband is faithful, the thirty-nine affected wives I see will shoot on night thirty-nine.
- *If* my husband is unfaithful, no one will shoot until night forty.

Through night thirty-eight, both hypotheses predict the exact same observation: silence.
Only the silence of the thirty-ninth night distinguishes them.
Because the rules forbid the wives from talking and allow information to flow only through public actions (or their absence) at midnight, thirty-nine nights must actually pass before the decisive observation arrives.

## Replace the public announcement with private letters

One of the paper's most illuminating variations keeps the queen's message word for word but changes how it is delivered.

Suppose each wife receives a private letter containing the queen's announcement and instruction.
Delivery is guaranteed—every letter eventually arrives—but with an unpredictable delay: there is no known upper bound on transit time, no receipt confirmation, and no information about when other wives' letters arrive.
These delivery rules are common knowledge.

When there is only one unfaithful husband, his wife still shoots at the first midnight after her letter arrives: she sees no other unfaithful husbands, so her letter alone settles the matter.

Now suppose there are two unfaithful husbands, married to Alice and Beatrice.
Alice receives her letter, sees that Beatrice's husband is unfaithful, and waits through a silent midnight.
Can she conclude that her own husband is unfaithful?

No.
She can explain the silence by supposing that her husband is faithful, Beatrice is the only affected wife, and Beatrice's letter is still in the mail.
Ten silent nights later—or a thousand silent nights later—that explanation remains open: guaranteed eventual delivery rules out an infinite delay, but it is compatible with any finite delay.
Neither Alice nor Beatrice can ever rule out her husband's fidelity.

By induction, the same paralysis holds for any $$k\geq 2$$ unfaithful husbands.
In a world with $$k$$ unfaithful husbands, each affected wife considers it possible that her husband is faithful and only the other $$k-1$$ are unfaithful; by the induction hypothesis, that $$k-1$$ world is permanently silent no matter when its letters arrive, so it matches everything she ever observes.

Under asynchronous private letters, **with two or more unfaithful husbands, nobody ever acts**—even if all forty letters happen to be delivered at the exact same moment.
Without common knowledge of the timing, simultaneous arrival cannot start the clock.

To restore action, the communication protocol must re-establish a shared reference point.
For instance, if the letters arrive before a commonly known deadline on a shared clock and the wives are instructed to begin counting nights only after that deadline, the induction runs just as it did after the public announcement.
What about sending return receipts—acknowledging the letter, then acknowledging the acknowledgment, and so on?
The [Rubinstein email game](/fun-stuff/economics/rubinstein-email-game.html) analyzes precisely that protocol, showing how any finite number of back-and-forth confirmations still stops short of common knowledge.

## Connections to agreement and no-trade theorems

The husbands puzzle is a pure-logic cousin of two classic results in information economics:

- **[Aumann's agreement theorem](/fun-stuff/economics/aumann-agreement.html)** shows that agents with a common prior cannot “agree to disagree” when their posterior beliefs become common knowledge. The husbands puzzle strips away probabilities and priors to exhibit the underlying partition mechanics: how public events shrink the set of reachable worlds.
- **[Milgrom and Stokey's no-trade theorem](/fun-stuff/economics/milgrom-stokey.html)** shows how willingness to trade reveals private information, just as a wife's silence at midnight reveals that she does not yet know her husband is unfaithful.

In all three settings, observing what others do—or refrain from doing—under a commonly known decision rule is itself a public message.
The queen's announcement supplies the base case by changing what everyone knows about everyone else's knowledge; each silent midnight then broadcasts the next step of the proof.

## Further reading

The journal article is Yoram Moses, Danny Dolev, and Joseph Y. Halpern, [“Cheating Husbands and Other Stories: A Case Study of Knowledge, Action, and Communication,” *Distributed Computing* 1, 167–176 (1986)](https://link.springer.com/article/10.1007/BF01661170).
An [author-hosted preliminary conference version from 1985](https://www.cs.cornell.edu/home/halpern/papers/cheathus.pdf) is freely available; Sections 2 and 3 present the public-announcement and asynchronous-letter cases discussed here, and later sections explore bounded delays and shared clocks.
