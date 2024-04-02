"use client";
import StyledMain from "./components/containers/StyledMain";
import GeneralUseButton from "./components/buttons/GeneralUseButton";
import { useEffect, useState } from "react";
import useLightOrDark from "./hooks/useTheme";
import {
  Card,
  DeckDrawResponse,
  DeckShuffleResponse,
} from "./types/responses/DeckOfCards";
import axios from "axios";
import PlayingCard from "./components/game/PlayingCard";
import { assert } from "console";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [deckInfo, setDeckInfo] = useState<null | DeckShuffleResponse>(null);
  const [deckId, setDeckId] = useState<string>("");
  const theme = useLightOrDark();
  const [cards, setCards] = useState<any[] | null>(null);
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DeckShuffleResponse>(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setDeckInfo(response.data);
        setDeckId(response.data.deck_id);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const drawCard = async () => {
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      console.log(response.data);
      cards
        ? setCards([...cards, response.data.cards[0]])
        : setCards([response.data.cards[0]]);

      console.log(cards);
    } catch (error) {
      console.error(error);
    }
  };

  const dealCards = async () => {
    let usersCards = [];
    let dealersCards = [];
    //a dealer will always deal to the user first
    //then to themselves, this will be alternated until both
    //the user and dealer have 2 cards each
    //once each array has 2 cards we will set the game state
    //to the user and dealer arrays

    //deal to the user
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      usersCards.push(response.data.cards[0]);
      console.log("User:", usersCards);
    } catch (error) {
      console.error(error);
    }

    //deal to the dealer
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      dealersCards.push(response.data.cards[0]);
      console.log("Dealer:", dealersCards);
    } catch (error) {
      console.error(error);
    }

    //deal to the user
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      usersCards.push(response.data.cards[0]);
      console.log("User:", usersCards);
    } catch (error) {
      console.error(error);
    }

    //deal to the dealer
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      dealersCards.push(response.data.cards[0]);
      console.log("Dealer:", response.data);
    } catch (error) {
      console.error(error);
    }

    //retrieve deck info
    const deckInfo = await axios.get<DeckShuffleResponse>(
      `https://deckofcardsapi.com/api/deck/${deckId}`
    );

    setDeckInfo(deckInfo.data);

    //set the game state
    setGame({ user: usersCards, dealer: dealersCards });
  };

  const checkForBlackJack = () => {
    if (game === null) return;
    //take the user and dealer cards

    //check if the user has blackjack
    //if the user has blackjack return the user wins
    //if the dealer has blackjack return the dealer wins
    //if both have blackjack return a draw
    //if neither have blackjack return the game state ongoing
    //account for aces being 1 or 11

    const user = game.user;
    const dealer = game.dealer;

    let userTotal = 0;
    let dealerTotal = 0;
    let winner = null;

    user.forEach((card: Card) => {
      if (card.value === "ACE") {
        if (userTotal + 11 > 21) {
          userTotal += 1;
        } else {
          userTotal += 11;
        }
      } else if (
        card.value === "KING" ||
        card.value === "QUEEN" ||
        card.value === "JACK"
      ) {
        userTotal += 10;
      } else {
        userTotal += parseInt(card.value);
      }
    });

    dealer.forEach((card: Card) => {
      if (card.value === "ACE") {
        if (dealerTotal + 11 > 21) {
          userTotal += 1;
        } else {
          userTotal += 11;
        }
      } else if (
        card.value === "KING" ||
        card.value === "QUEEN" ||
        card.value === "JACK"
      ) {
        dealerTotal += 10;
      } else {
        dealerTotal += parseInt(card.value);
      }
    });

    //check for winner
    if (userTotal === 21 && dealerTotal === 21) {
      winner = "draw";
    } else if (userTotal === 21 || dealerTotal > 21) {
      winner = "user";
    } else if (dealerTotal === 21 || userTotal > 21) {
      winner = "dealer";
    } else {
      winner = "ongoing";
    }

    return { userTotal, dealerTotal, winner };
  };

  const userHit = async () => {
    //if the user hits, draw a card and add it to the user array
    //if the user busts, the dealer wins
    //if the user hits 21, the user wins
    //if the user hits under 21, the game continues
    //if the ace is drawn and the user busts, change the value of the ace to 1
    const response = await axios.get<DeckDrawResponse>(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );

    const card = response.data.cards[0];
    const user = game.user;
    let userTotal = checkForBlackJack()?.userTotal ?? 0;

    if (card.value === "ACE") {
      user.forEach((card: Card) => {
        if (card.value === "ACE") {
          if (userTotal + 11 > 21) {
            userTotal += 1;
          } else {
            userTotal += 11;
          }
        }
      });
    } else if (
      card.value === "KING" ||
      card.value === "QUEEN" ||
      card.value === "JACK"
    ) {
      card.value = "10";
    }

    user.push(card);

    setGame({ ...game, user: user });
  };

  console.log(deckId, deckInfo, loading, "Game:", game);
  return (
    <>
      <StyledMain $currentTheme={theme.currentTheme}>
        <div>{JSON.stringify(checkForBlackJack())}</div>
        <div>{JSON.stringify(deckInfo)}</div>

        <GeneralUseButton
          $currentTheme={theme.currentTheme}
          onClick={() => theme.toggleTheme()}
        >
          Click Me
        </GeneralUseButton>
        <GeneralUseButton
          $currentTheme={theme.currentTheme}
          onClick={dealCards}
        >
          Draw Card
        </GeneralUseButton>
        <GeneralUseButton $currentTheme={theme.currentTheme} onClick={userHit}>
          Hit
        </GeneralUseButton>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <>
            <span>User</span>
            {game?.user &&
              game.user.map((card: Card, index: number) => {
                return (
                  <div key={index}>
                    <PlayingCard image={card.image} code={card.code} />
                  </div>
                );
              })}
          </>
          <>
            <span>Dealer</span>
            {game?.dealer &&
              game.dealer.map((card: Card, index: number) => {
                if (index === 0) {
                  return (
                    <div key={index}>
                      <PlayingCard image="card_back" code="card_back" />
                    </div>
                  );
                }
                return (
                  <div key={index}>
                    <PlayingCard image={card.image} code={card.code} />
                  </div>
                );
              })}
          </>
        </div>
        <div>Hello</div>
      </StyledMain>
    </>
  );
}
