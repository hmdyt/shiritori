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
    histories.reverse();
    return (
        <List>
            {histories.map((history, index) => {
                return index === 0 ? (
                    <ListItem key={index}>
                        <b>{history.word}</b>
                    </ListItem>
                ) : (
                    <ListItem key={index}>
                        <span>{history.word}</span>
                    </ListItem>
                );
            })}
        </List>
    );
};