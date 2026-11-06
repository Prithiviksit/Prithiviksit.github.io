---
layout: fun-article
title: "Forty Cheating Husbands: What Silence Can Tell Us"
description: "A rigorous, approachable proof of the forty cheating husbands puzzle, and what delayed messages reveal about common knowledge, communication, and action."
group: Logics
subtitle: "A public announcement, thirty-nine silent nights, and the difference between knowing and knowing that others know."
lead: "Everyone already knows that somebody is unfaithful. Then the queen announces exactly that, and everything changes. What did she tell them that they did not already know?"
permalink: /fun-stuff/logics/forty-cheating-husbands.html
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
The number of couples is known.
Initially, a wife can distinguish every husband's status except her own husband's.
She has no additional information that settles his status.

**Forty is information given to us, the readers.**
The queen never announces that number.
If she did, a wife who saw thirty-nine unfaithful husbands would immediately identify her own as the fortieth.

We also need the following rules:

- Every wife reasons correctly and follows the queen's instruction exactly: she acts at the first midnight after learning that her husband is unfaithful, and only then.
- Everyone hears the queen's truthful announcement together and understands that everyone hears it.
- Every midnight is a simultaneous decision: nobody can react to another shot during that same midnight.
- Everyone can reliably tell whether a night was silent. They remember the previous nights and count them from the announcement.
- There are no other messages, disclosures, or sources of information about fidelity.

The information structure, the reasoning, the obedience, and these observation rules are all common knowledge.
Everyone knows them, everyone knows that everyone knows them, and so on.

Hearing whether any shots occurred is enough.
The proof does not require counting shots or identifying who fired them.

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

The pattern suggests the answer, but a complete proof must establish both parts: everyone who should act eventually does, and nobody acts earlier.

## A proof by eliminating possible worlds

**Claim.** If exactly $$k\geq 1$$ husbands are unfaithful, the first $$k-1$$ nights are silent, and all $$k$$ are shot on night $$k$$.
No faithful husband is ever shot.

Represent a possible world by a set

$$
H\subseteq\{1,\ldots,N\},
$$

where $$i\in H$$ means that husband $$i$$ is unfaithful.
Before the announcement, every subset is possible in the model.
Wife $$i$$ observes the status of everyone except husband $$i$$.
Her two initially possible worlds therefore differ only in whether $$i$$ belongs to $$H$$.

The public announcement removes the empty set: there must be at least one unfaithful husband.
After that, each silent night removes more possibilities.
We will prove that, after the announcement and $$t$$ silent nights, the worlds consistent with the public history are exactly

$$
\boxed{
\Omega_t
=\left\{H\subseteq\{1,\ldots,N\}:|H|\geq t+1\right\}.
}
$$

Here $$t=0$$ means that the announcement has occurred but the first midnight has not.
Each wife combines this public set with her own observation of the other husbands.

The formula is true at $$t=0$$ because the announcement excludes exactly the world with no unfaithful husbands.

Suppose it is true after $$t$$ silent nights, and consider a world $$H\in\Omega_t$$.
For a wife whose husband is unfaithful, there are two possibilities to examine:

1. Her husband is unfaithful, so the world is $$H$$.
2. Her husband is faithful, so the world is $$H\setminus\{i\}$$.

These worlds agree on everything she sees about the other husbands.
The second remains consistent with the public history precisely when

$$
|H|-1\geq t+1.
$$

Consequently, she knows her own husband is unfaithful precisely when

$$
|H|=t+1.
$$

If there are exactly $$t+1$$ unfaithful husbands, every affected wife therefore acts on the next night, night $$t+1$$.
If there are more, none does: each still has a possible world in which her own husband is faithful.
A wife with a faithful husband never knows him to be unfaithful, since the true world remains consistent with all her information.

Thus the next night contains shots exactly in the worlds with $$|H|=t+1$$.
If it is silent, those worlds are eliminated, leaving

$$
\Omega_{t+1}
=\left\{H\subseteq\{1,\ldots,N\}:|H|\geq t+2\right\}.
$$

This proves the formula by induction for every possible silent history.
In a world with exactly $$k$$ unfaithful husbands, the first $$k-1$$ nights are therefore silent, and all the affected wives act on night $$k$$.
This proves the claim.

For forty husbands, the public information evolves as follows:

| Observation | What becomes common knowledge |
| --- | --- |
| The queen's announcement | At least one husband is unfaithful. |
| One silent night | At least two are unfaithful. |
| Two silent nights | At least three are unfaithful. |
| Thirty-eight silent nights | At least thirty-nine are unfaithful. |
| Thirty-nine silent nights | At least forty are unfaithful. |

A wife who sees thirty-nine unfaithful husbands initially considers two totals possible: thirty-nine and forty.
After thirty-eight silent nights, both remain possible.
After the thirty-ninth silent night, thirty-nine is ruled out.
Her husband must be the fortieth.

## What did the queen actually add?

At the actual world, every wife already knows that at least one husband is unfaithful.
The announcement does not change that first-level fact.

But knowing a fact is different from knowing that someone else knows it, and from knowing that someone else knows that someone else knows it.
The queen's announcement changes this hierarchy.

To see the difference, start from a world with forty unfaithful husbands.
Choose one affected wife.
She cannot initially distinguish that world from a world in which her husband is faithful and only thirty-nine are unfaithful.
In that second world, another affected wife cannot distinguish it from a world with thirty-eight.
Continue:

$$
40\;\longleftrightarrow\;39
\;\longleftrightarrow\;38
\;\longleftrightarrow\;\cdots
\;\longleftrightarrow\;1
\;\longleftrightarrow\;0.
$$

Each arrow changes one husband's status and represents an uncertainty of his wife at that hypothetical world.
It need not represent the same wife's uncertainty at successive steps.
No wife in the actual forty-husband world thinks that there might be zero unfaithful husbands.
The chain describes uncertainty about other people's uncertainty, repeated many times.

As explained in the [Aumann article](/fun-stuff/economics/aumann-agreement.html#what-common-knowledge-adds), an assertion is common knowledge if it holds at every world reachable through such a chain of individual possibilities.
Before the announcement, the zero-husband world is reachable.
The existence of an unfaithful husband is therefore not common knowledge.

The public announcement removes the zero-husband world from everyone's model, including their models of one another's information.
The existence claim now holds everywhere that remains, making it common knowledge.
That supplies the base case for the entire induction.

The announcement can therefore leave everyone's direct knowledge of the existence claim unchanged while transforming what they can deduce about one another.
Each subsequent public silence supplies the next step.

## Why perfect reasoners still have to wait

It may seem strange that people who can carry out the entire induction immediately need forty days to finish it.
Why not think through all forty cases on the first afternoon?

They can.
What they cannot do is observe a future silence before it happens.

An affected wife knows on the first day that, if her husband is faithful, the other thirty-nine affected wives will act on night thirty-nine.
She also knows that, if he is unfaithful, nobody will act before night forty.
Both hypotheses predict exactly the same observations through night thirty-eight.
Logical skill cannot distinguish hypotheses that have produced the same information.

The wait is a consequence of the communication rules.
The wives are allowed to reveal information only through the prescribed actions and their absence.
If they could simply tell one another what they see, this forty-night process would be unnecessary.

## Replace the public announcement with private letters

One of the paper's most instructive variations keeps the queen's message but changes its delivery.

Suppose each wife receives a private letter containing the same truthful announcement and instruction.
Delivery is reliable: every letter eventually arrives.
But there is no known finite upper bound on the delay, no receipt acknowledgments, and no information about the order or timing of other wives' deliveries.
Before receiving her own letter, a wife gets no new information from the queen.
These delivery rules are commonly understood.

In the version with one unfaithful husband, his wife still acts at the first midnight after receiving her letter.
She sees no other unfaithful husband and can identify her own directly.

Now consider two unfaithful husbands.
Alice has received her letter and sees that Beatrice's husband is unfaithful.
The next midnight is silent.
Can Alice conclude that her own husband is unfaithful?

No.
She has another explanation: her husband is faithful, Beatrice is the only affected wife, and Beatrice's letter has not arrived yet.

After ten silent nights, the same explanation remains possible.
After a thousand, it remains possible.
Eventual delivery rules out a letter that never arrives, but it does not rule out arrival after any particular finite date.
Alice cannot eliminate this explanation at any finite time.
Beatrice faces the same problem.
Neither acts.

The reasoning extends by induction to any number greater than two.
If there are $$k\geq 3$$ unfaithful husbands, an affected wife can consider the world in which her own husband is faithful and only the other $$k-1$$ are unfaithful.
By the preceding case of the induction, that world also produces silence regardless of when its letters arrive.
It can therefore match her own letter's arrival and every finite silent history she observes.
She never learns that her husband is unfaithful.

Under this private-letter protocol, **with two or more unfaithful husbands, nobody ever acts**.
This remains true even if all the letters happen to arrive simultaneously: the actual coincidence of delivery times does not make simultaneous receipt known.

The conclusion is specific to the information supplied by this protocol.
It does not say that every system with delayed messages makes action impossible.
The paper also studies delivery bounds, clocks, and known delivery orders, and shows that these details can change the outcome.

For example, a stronger protocol could specify a commonly known delivery deadline, a shared clock, and a common starting time after that deadline, with no actions allowed before the start.
If the guarantee of delivery and these rules are common knowledge, the wives can begin the original induction together at that starting time.
Merely knowing that one's own letter arrived does not provide the same foundation.

What if the recipients could acknowledge their messages, then acknowledge the acknowledgments?
The [Rubinstein email game](/fun-stuff/economics/rubinstein-email-game.html) studies exactly that kind of exchange.
It replaces the wives' mandatory action rule with an explicit coordination game and shows why even many reliable confirmations can leave uncertainty that matters for incentives.

## The connection to agreement and no trade

The [Aumann article](/fun-stuff/economics/aumann-agreement.html) asks what happens when different posterior beliefs become common knowledge.
Under a common prior, those posteriors must agree.
The proof works by identifying a common-knowledge event and averaging beliefs over it.

The husbands puzzle isolates the informational part of the story.
A public announcement changes the set of possible worlds, and observed behavior changes it again.
It requires no common prior because it uses certainty and possibility, rather than numerical probabilities.

The connection to [Milgrom–Stokey's no-trade theorem](/fun-stuff/economics/milgrom-stokey.html) concerns what we learn from other people's actions.
A trader's willingness to transact can reveal something about the information behind that willingness.
Here, a wife's failure to act reveals something about what she has been able to establish.

That inference depends on knowing the rule connecting information to action.
Silence is informative because a wife who knew her husband was unfaithful would certainly act at the prescribed time.
If she could choose to wait, or if others were uncertain about her obedience, the inference would need to change.
Similarly, interpreting a trade requires understanding the trader's information, incentives, and alternatives.

The theorems draw different conclusions from this reasoning.
Aumann restricts commonly known beliefs.
Milgrom–Stokey combines common knowledge of a trade's acceptability with an initially efficient allocation to restrict mutually beneficial trade.
The husbands puzzle describes how a specified sequence of public observations turns uncertainty into knowledge and triggers action.

The queen's announcement starts the process by changing what everyone knows about everyone else's knowledge.
The thirty-nine silences then become thirty-nine further pieces of public information.

## Further reading

The journal article is Yoram Moses, Danny Dolev, and Joseph Y. Halpern, [“Cheating Husbands and Other Stories: A Case Study of Knowledge, Action, and Communication,” *Distributed Computing* 1, 167–176 (1986)](https://link.springer.com/article/10.1007/BF01661170).
An [author-hosted preliminary conference version from 1985](https://www.cs.cornell.edu/home/halpern/papers/cheathus.pdf) is freely available.
Sections 2 and 3 of that version present the public-announcement and asynchronous-letter cases used here; later sections explore further communication rules.
The story itself predates the paper, whose contribution is to use its variants to study knowledge and distributed communication systematically.
