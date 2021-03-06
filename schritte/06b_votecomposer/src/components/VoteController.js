import React from "react";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";
import VoteComposer from "./VoteComposer";

export default function VoteController({ initialVotes }) {
  const [allVotes, setAllVotes] = React.useState(initialVotes);
  const [currentVoteId, setCurrentVoteId] = React.useState(null);
  const [voteComposerActive, setVoteComposerActive] = React.useState(false);

  function setCurrentVote(vote) {
    closeVoteComposer();
    setCurrentVoteId(vote.id);
  }

  function unsetCurrentVote() {
    setCurrentVoteId(null);
  }

  function closeVoteComposer() {
    setVoteComposerActive(false);
  }

  function openVoteComposer() {
    unsetCurrentVote();
    setVoteComposerActive(true);
  }

  function registerVote(vote, choice) {
    const newVotes = allVotes.map(v =>
      v.id !== vote.id
        ? v
        : {
            ...vote,
            choices: vote.choices.map(c =>
              c.id !== choice.id ? c : { ...c, count: c.count + 1 }
            )
          }
    );

    setAllVotes(newVotes);
  }

  return (
    <div>
      <VoteList
        allVotes={allVotes}
        currentVoteId={currentVoteId}
        onSelectVote={setCurrentVote}
        onDismissVote={unsetCurrentVote}
        onRegisterVote={registerVote}
      />
      {voteComposerActive ? (
        <VoteComposer onDeactivate={closeVoteComposer} />
      ) : (
        <InactiveVoteComposer onActivate={openVoteComposer} />
      )}
    </div>
  );
}
