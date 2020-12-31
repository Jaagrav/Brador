import React from 'react';
import { styles } from './styles';

import { IconButton, Avatar, Menu, MenuItem, Button } from "@material-ui/core";
import { AddRounded as AddRoundedIcon } from '@material-ui/icons';

import { DragDropContext } from "react-beautiful-dnd";

import Bradors from "./components/Bradors";

import { firebase, auth, database } from "../../components/firebase";
import { currentDate } from "../../components/currentTime";

function Home() {
    const [userAuthData, setUserAuthData] = React.useState({
        uid: "",
        displayName: "",
        photoURL: "",
    });
    const [bradors, setBradors] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const emptyBrador = {
        nails: {
            'nail-1': { id: 'nail-1', content: 'Get a haircut' },
            'nail-2': { id: 'nail-2', content: 'Finish Homework' },
            'nail-3': { id: 'nail-3', content: 'Check out Brädor' }
        },
        lists: {
            'list-1': {
                id: 'list-1',
                title: 'ToDo',
                nailIDs: ['nail-1', 'nail-2']
            },
            'list-2': {
                id: 'list-2',
                title: 'In Progress',
                nailIDs: ['nail-3']
            },
            'list-3': {
                id: 'list-3',
                title: 'Completed',
                nailIDs: []
            }
        },
        listorder: ['list-1', 'list-2', 'list-3']
    }

    const onDragStart = (result, e) => {
        // Do Nothing for now
    }
    const onDragEnd = result => {
        //Update Drag and Drop Result
        let tempArr = bradors;
        let temp = tempArr[result.source.index];

        if (result.source && result.destination) {
            if (result.source.index < result.destination.index) {
                for (let i = result.source.index + 1; i <= result.destination.index; i++)
                    tempArr[i - 1] = tempArr[i];
                tempArr[result.destination.index] = temp;
            }
            else if (result.source.index > result.destination.index) {
                for (let i = result.source.index; i > result.destination.index; i--)
                    tempArr[i] = tempArr[i - 1];
                tempArr[result.destination.index] = temp;
            }
        }

        // console.log(tempArr)
        setBradors(tempArr);
        if (userAuthData.uid && tempArr)
            database
                .child(userAuthData.uid)
                .child("my_bradors")
                .set(tempArr);
    }
    const logInUser = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        if (!auth.currentUser)
            auth.signInWithPopup(provider);
    }
    const logOutUser = () => {
        if (auth.currentUser)
            auth.signOut();
        handleClose();
    }
    const showSourceCode = () => {
        window.open("https://github.com/Jaagrav/Brador", "_blank");
        handleClose();
    }
    const addBrador = () => {
        if (auth.currentUser) {
            const newID = Math.random().toString().substring(2);
            setBradors(prevBradors => [...prevBradors, {
                id: newID,
                title: "Untitled",
                lastUpdated: currentDate(),
                created: currentDate(),
                brador: emptyBrador
            }])
        }
        else {
            logInUser();
        }
    }

    const handleClick = (event) => {
        logInUser();
        if (auth.currentUser)
            setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                database
                    .child(firebaseUser.uid)
                    .child("my_bradors")
                    .once("value")
                    .then(snap => {
                        if (snap.val())
                            setBradors(snap.val());
                        else
                            setBradors([]);
                    })
                setUserAuthData({ uid: firebaseUser.uid, stageName: firebaseUser.displayName, photoURL: firebaseUser.photoURL });
            } else {
                setUserAuthData({ uid: "", stageName: "", photoURL: "" });
                setBradors([]);
            }
        })
    }, [])

    React.useEffect(() => {
        // console.log(bradors)

        if (userAuthData.uid && bradors)
            database
                .child(userAuthData.uid)
                .child("my_bradors")
                .set(bradors);
    }, [bradors]);

    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={showSourceCode}>Source Code</MenuItem>
                <MenuItem onClick={logOutUser}>Logout</MenuItem>
            </Menu>
            <div style={styles.homePage}>
                <div style={styles.brandingName}>Brädor</div>
                <div style={styles.bradorsContainer}>
                    <div style={styles.bradorsHeader}>
                        <span style={styles.bradorHeaderSpan}>Your Brädors</span>
                        <IconButton onClick={addBrador}>
                            <AddRoundedIcon />
                        </IconButton>
                        <Avatar onClick={handleClick} alt={userAuthData.stageName} src={userAuthData.photoURL} style={styles.photoURL} />
                    </div>
                    {
                        (!auth.currentUser) ?
                            (<center style={{ marginTop: 5 }}>Looks like you are not logged in, please click on Sign In to use Brador: <Button variant="outlined" style={{ marginTop: 5 }} onClick={logInUser}>Sign In</Button></center>) : ("")
                    }
                    <DragDropContext
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                    >
                        <Bradors bradors={bradors} uid={userAuthData.id} />
                    </DragDropContext>
                </div>
            </div>
        </>
    )
}

export default Home;
