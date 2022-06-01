import React from 'react';
import { Container, Grid, CssBaseline, Card, CardContent } from '@mui/material';

import { Header } from './component/Header';
import { WordInputForm } from './component/WordInputForm';
import { History, historyAttr } from './component/History';

type Player = {
    id: number;
    name: string;
    isActive: boolean;
    inputWord: string;
}

const App: React.FC = () => {
    let [players, setPlayers] = React.useState<Player[]>([]);
    let [histories, setHistories] = React.useState<historyAttr[]>([]);
    let [usedWords, setUsedWords] = React.useState<Set<string>>(new Set<string>());
    players.push({ id: 0, name: 'player1', isActive: false , inputWord: ''});
    players.push({ id: 1, name: 'player2', isActive: false , inputWord: ''});
    
    const setPlayerActivity = (id: number, isActive: boolean) => {
        setPlayers(players.map(player => {
            if (player.id === id) {
                player.isActive = isActive;
            }
            return player;
        }));
    }

    const isMyturn = (player: Player) => {
        if (player.id === histories[histories.length - 1].playerID) {
            return false;
        } else {
            return true;
        }
    }

    const isAvailableWord = (word: string) => {
        if (word.length < 3) {
            return false;
        } else {
            let lastWord = histories[histories.length - 1].word;
            if (word[0] === lastWord[lastWord.length - 1]) {
                return true;
            }
            return false;
        }
    }

    const setPlayerInputWord = (id: number, word: string) => {
        setPlayers(players.map(player => {
            if (player.id === id) {
                player.inputWord = word;
            }
            return player;
        }));
    }

    const canSubmit = (playerID: number, word: string) => {
        let is_first_word = !(usedWords.has(word));
        let is_myturn = isMyturn(players[playerID]);
        let is_available_word = isAvailableWord(word);
        return is_first_word && is_myturn && is_available_word;
    }

    const handleFormChange = (playerID: number, word: string) => {
        setPlayerInputWord(playerID, word);
        // initial word
        if (histories.length === 0) {
            if (word.length < 3) {
                setPlayerActivity(playerID, false);
            } else {
                setPlayerActivity(playerID, true);
            }
            return;
        }
        
        if (canSubmit(playerID, word)) {
            setPlayerActivity(playerID, true);
        } else {
            setPlayerActivity(playerID, false);
        }
    }

    const handleFormSubmit = (playerID: number, word: string) => {
        setPlayerActivity(playerID, false);
        setPlayerInputWord(playerID, '');
        setHistories(histories.concat({ playerID, word }));
        setUsedWords(usedWords.add(word));
    }

    const handleFormSubmitEnter = (playerID: number, word: string) => {
        if (canSubmit(playerID, word)) {
            handleFormSubmit(playerID, word);
        }
    }

    return (
        <>  
            <CssBaseline />
            <Header title="Shiritori" githubLink="https://github.com/hmdyt/shiritori" />
            <Container fixed sx={{ pt: 3 }}>  
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <WordInputForm
                                    handleChange={(word) => handleFormChange(players[0].id, word)}
                                    handleSubmit={(word) => handleFormSubmit(players[0].id, word)}
                                    handleSubmitEnter={(word) => handleFormSubmitEnter(players[0].id, word)}
                                    word={players[0].inputWord}
                                    name={players[0].name}
                                    isButtonActive={players[0].isActive}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <History histories={histories} n_show={10} />
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <WordInputForm
                                    handleChange={(word) => handleFormChange(players[1].id, word)}
                                    handleSubmit={(word) => handleFormSubmit(players[1].id, word)}
                                    handleSubmitEnter={(word) => handleFormSubmitEnter(players[1].id, word)}
                                    word={players[1].inputWord}
                                    name={players[1].name}
                                    isButtonActive={players[1].isActive}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default App;
