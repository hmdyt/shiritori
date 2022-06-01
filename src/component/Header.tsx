import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import { GitHub } from "@mui/icons-material";

export type headerProps = {
    title: string
    githubLink: string
}

export const Header = (props: headerProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar variant="dense">
                    <Typography component="div" style={{ flexGrow: 1 }}>
                        {props.title}
                    </Typography>
                    <a href={props.githubLink}>
                        <IconButton>
                            <GitHub />
                        </IconButton>
                    </a>
                </Toolbar>
            </AppBar>
        </Box>
    )
}