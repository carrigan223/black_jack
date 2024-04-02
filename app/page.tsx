"use client";
import StyledMain from "./components/containers/main/StyledMain";
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
import { Game } from "./types/state/Game";
import { Deck } from "./types/state/Deck";
import styled from "styled-components";

const CardsInPlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

//the card should be responsive
const DeckInfoCard = styled.div`
  width: 17%;
  display: flex;
  flex-direction: column;
  color: black;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  background: white;

  @media (max-width: 768px) {
    width: 30%;
  }
`;

const DeckInfoText = styled.span`
  font-size: 24px;
  color: black;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.441);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BoardInfoRow = styled.div`
  display: flex;
  justify-content: end;
  align-items: space-between;
  width: 100%;
  height: 10%;
  padding-bottom: 10px;
`;

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [deckId, setDeckId] = useState<string>("");
  const [deckState, setDeckState] = useState<Deck | null>(null);
  // const [cards, setCards] = useState<any[] | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  //set the currentGame, and hand history
  const theme = useLightOrDark();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DeckDrawResponse>(
          "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
        );
        console.log(response.data);
        setDeckId(response.data.deck_id);
        setDeckState({
          deck_id: response.data.deck_id,
          remaining: response.data.remaining,
          success: response.data.success,
        });
        let userCards = response.data.cards.slice(0, 2) as Card[];
        let dealerCards = response.data.cards.slice(2, 4) as Card[];
        setGame({
          user_hand: userCards,
          dealer_hand: dealerCards,
          winner: null,
          userTotal: null,
          dealerTotal: null,
        });
        setTimeout(() => {
          setLoading(false);
        }, 400);
        checkForBlackJack();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (game) {
      checkForBlackJack();
    }
  }, [game]);

  console.log(deckState, game);

  const drawCard = async () => {
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      console.log(response.data);
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
    } catch (error) {
      console.error(error);
    }

    //deal to the dealer
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      dealersCards.push(response.data.cards[0]);
    } catch (error) {
      console.error(error);
    }

    //deal to the user
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      usersCards.push(response.data.cards[0]);
    } catch (error) {
      console.error(error);
    }

    //deal to the dealer
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      dealersCards.push(response.data.cards[0]);
    } catch (error) {
      console.error(error);
    }

    //retrieve deck info
    const deckInfo = await axios.get<DeckShuffleResponse>(
      `https://deckofcardsapi.com/api/deck/${deckId}`
    );

    //set the game state
    setGame({
      winner: null,
      userTotal: 0,
      dealerTotal: 0,
      user_hand: usersCards,
      dealer_hand: dealersCards,
    });
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

    const user = game.user_hand;
    const dealer = game.dealer_hand;

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
      setWinner("draw");
    } else if (userTotal === 21 || dealerTotal > 21) {
      winner = "user";
      setWinner("user");
    } else if (dealerTotal === 21 || userTotal > 21) {
      winner = "dealer";
      setWinner("dealer");
    } else {
      winner = null;
    }

    return { userTotal, dealerTotal, winner };
  };

  const userHit = async () => {
    if (game === null) return;
    //if the user hits, draw a card and add it to the user array
    //if the user busts, the dealer wins
    //if the user hits 21, the user wins
    //if the user hits under 21, the game continues
    //if the ace is drawn and the user busts, change the value of the ace to 1
    const response = await axios.get<DeckDrawResponse>(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );

    const card = response.data.cards[0];
    console.log(card);
    const user_cards = game.user_hand;
    let userTotal = checkForBlackJack()?.userTotal ?? 0;

    if (card.value === "ACE") {
      user_cards.forEach((card: Card) => {
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

    user_cards.push(card);

    setGame({ ...game, user_hand: user_cards });
  };

  return (
    <>
      {loading ? (
        <>
          <div
            style={{
              background:
                "linear-gradient( 240deg,#faf8f852 0%,rgba(0, 0, 0, 0.106) 40%,#080808be 100%)",
              zIndex: 1,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              display: "flex",
              fontSize: 24,
              color: "white",
            }}
          >
            Loading
          </div>
        </>
      ) : (
        <>
          <StyledMain $currentTheme={theme.currentTheme}>
            <BoardInfoRow>
              <DeckInfoCard>
                <DeckInfoText>Cards Remaining</DeckInfoText>
                <DeckInfoText>{deckState?.remaining ?? "na"}</DeckInfoText>
              </DeckInfoCard>
              {winner && (
                <DeckInfoCard>
                  <DeckInfoText>Winner</DeckInfoText>
                  <DeckInfoText>{winner ?? "na"}</DeckInfoText>
                </DeckInfoCard>
              )}
            </BoardInfoRow>
            <div>
              <span>Dealer</span>

              <CardsInPlay>
                {game?.dealer_hand &&
                  game.dealer_hand.map((card: Card, index: number) => {
                    if (index === 0) {
                      return (
                        <div style={{ padding: 6 }} key={index}>
                          <PlayingCard image="card_back" code="card_back" />
                        </div>
                      );
                    }
                    return (
                      <div style={{ padding: 6 }} key={index}>
                        <PlayingCard
                          right
                          image={card.image}
                          code={card.code}
                        />
                      </div>
                    );
                  })}
              </CardsInPlay>
            </div>
            <div>
              <span>User</span>
              <CardsInPlay>
                {game?.user_hand &&
                  game.user_hand.map((card: Card, index: number) => {
                    return (
                      <div style={{ padding: 6 }} key={index}>
                        <PlayingCard
                          right={index === 1}
                          image={card.image}
                          code={card.code}
                        />
                      </div>
                    );
                  })}
              </CardsInPlay>
            </div>
            <GeneralUseButton
              $currentTheme={theme.currentTheme}
              onClick={() => theme.toggleTheme()}
            >
              Click Me
            </GeneralUseButton>
            {/* <GeneralUseButton
              $currentTheme={theme.currentTheme}
              onClick={dealCards}
            >
              Draw Card
            </GeneralUseButton> */}
            <GeneralUseButton
              $currentTheme={theme.currentTheme}
              onClick={userHit}
            >
              Hit
            </GeneralUseButton>

            {/* 
           

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
                      <div style={{ padding: 6 }} key={index}>
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
                        <div style={{ padding: 6 }} key={index}>
                          <PlayingCard image="card_back" code="card_back" />
                        </div>
                      );
                    }
                    return (
                      <div style={{ padding: 6 }} key={index}>
                        <PlayingCard image={card.image} code={card.code} />
                      </div>
                    );
                  })}
              </>
            </div>
            <div>Hello</div> */}
          </StyledMain>
        </>
      )}
    </>
  );
}
