import { List, ListItem } from "@mui/material";

export type historyAttr = {
    playerID: number;
    word: string;
}

type historyProps = {
    histories: historyAttr[];
    n_show: number;
};

export const History = (props: historyProps) => {
    const histories = props.histories.slice(0, props.n_show);
    return (
        <List>
            {histories.map((history, index) => (
                <ListItem key={index}>{history.playerID + history.word}</ListItem>
            ))}
        </List>
    );
};