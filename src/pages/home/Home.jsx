import React from 'react';
import { styles } from './styles';

import { IconButton, Avatar } from "@material-ui/core";
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

        console.log(tempArr)
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
        else
            auth.signOut();
    }
    const addBrador = () => {
        if (auth.currentUser) {
            setBradors([...bradors, {
                id: Math.random().toString().substring(2),
                title: "Untitled",
                lastUpdated: currentDate,
                created: currentDate
            }])
        }
    }

    React.useEffect(() => {
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                database
                    .child(firebaseUser.uid)
                    .child("my_bradors")
                    .once("value")
                    .then(snap => {
                        setBradors(snap.val());
                    })
                setUserAuthData({ uid: firebaseUser.uid, stageName: firebaseUser.displayName, photoURL: firebaseUser.photoURL });
            } else {
                setUserAuthData({ uid: "", stageName: "", photoURL: "" });
                setBradors([]);
            }
        })
    }, [])

    React.useEffect(() => {
        console.log(bradors)

        if (userAuthData.uid && bradors)
            database
                .child(userAuthData.uid)
                .child("my_bradors")
                .set(bradors);
    }, [bradors]);

    return (
        <div style={styles.homePage}>
            <div style={styles.brandingName}>Brädor</div>
            <div style={styles.bradorsContainer}>
                <div style={styles.bradorsHeader}>
                    <span style={styles.bradorHeaderSpan}>Your Brädors</span>
                    <IconButton onClick={addBrador}>
                        <AddRoundedIcon />
                    </IconButton>
                    <Avatar alt={userAuthData.stageName} src={userAuthData.photoURL} style={styles.photoURL} onClick={logInUser} />
                </div>
                <DragDropContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                >
                    <Bradors bradors={bradors} uid={userAuthData.id} />
                </DragDropContext>
            </div>
        </div>
    )
}

export default Home;
