import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './styles';

import { auth, database } from '../../components/firebase';

import { Avatar, IconButton, Backdrop, CircularProgress } from "@material-ui/core";
import { AddRounded } from '@material-ui/icons';

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./components/List";

import { currentDate } from "../../components/currentTime";

function Brador(props) {
    document.title = "My Board - Brador";

    const [newListTitle, setNewListTitle] = React.useState("");
    const [bradorTitle, setBradorTitle] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [userAuthData, setUserAuthData] = React.useState({
        uid: "",
        displayName: "",
        photoURL: "",
    });
    const [bradorData, setBradorData] = React.useState({
        nails: {},
        lists: {},
        listorder: []
    });

    const onDragStart = (e) => {
        // console.log("Drag started...")
    }
    const onDragEnd = (e) => {
        try {
            if (e.type === "list") {
                let listsArr = bradorData.listorder;
                let sourceIndex = e.source.index;
                let targetIndex = e.destination.index;

                let temp = listsArr[sourceIndex];
                listsArr.splice(sourceIndex, 1);
                listsArr.splice(targetIndex, 0, temp);

                setBradorData({ ...bradorData, listorder: listsArr })
            }
            else if (e.type === "nail") {
                let listsContent = bradorData.lists;

                let sourceList = e.source.droppableId,
                    targetList = e.destination.droppableId,
                    sourceIndex = e.source.index,
                    targetIndex = e.destination.index;

                let temp = listsContent[sourceList].nailIDs[sourceIndex];
                listsContent[sourceList].nailIDs.splice(sourceIndex, 1);

                if (!listsContent[targetList].nailIDs)
                    listsContent[targetList].nailIDs = [];
                listsContent[targetList].nailIDs.splice(targetIndex, 0, temp);

                // console.log(listsContent);

                setBradorData({ ...bradorData, lists: listsContent })
            }
        } catch (err) {
            //Catching errors when the elements are dragged but not moved
            //Do Nothing...
            console.log(err)
        }
    }
    const addList = () => {
        if (newListTitle.trim()) {
            const newListID = `list-${Object.keys(bradorData.lists).length + 1}`;
            let lists = bradorData.lists;
            const emptyList = {
                id: newListID,
                title: newListTitle,
                nailIDs: [],
            }
            lists[newListID] = emptyList;

            let listorder = bradorData.listorder;
            listorder.push(newListID);

            setBradorData({ ...bradorData, lists: lists, listorder: listorder });
            setNewListTitle("");
        }
    }
    React.useEffect(() => {
        //Load list
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                database
                    .child(firebaseUser.uid)
                    .child("my_bradors")
                    .child(props.match.params.index)
                    .once("value")
                    .then(snap => {
                        setBradorTitle(snap.val().title)
                        // setBradorData({ nails: snap.val().brador.nails, lists: snap.val().brador.lists, listorder: snap.val().brador.listorder })
                        const bradorDataTemp = snap.val().brador;
                        setBradorData(bradorDataTemp);
                        setIsLoading(false);

                        document.title = snap.val().title + " - Brador";
                    })
                setUserAuthData({ uid: firebaseUser.uid, stageName: firebaseUser.displayName, photoURL: firebaseUser.photoURL });
            } else {
                setUserAuthData({ uid: "", stageName: "", photoURL: "" });
            }
        })
    }, [])

    React.useEffect(() => {
        try {
            database
                .child(userAuthData.uid)
                .child("my_bradors")
                .child(props.match.params.index)
                .child("title")
                .set(bradorTitle)
        } catch (err) {
            //Do Nothing
        }
    }, [bradorTitle]);

    React.useEffect(() => {
        // console.log("Brador Data has changed...", bradorData);
        try {
            if (bradorData.nails && bradorData.lists) {
                database
                    .child(userAuthData.uid)
                    .child("my_bradors")
                    .child(props.match.params.index)
                    .child("brador")
                    .set(bradorData);
                database
                    .child(userAuthData.uid)
                    .child("my_bradors")
                    .child(props.match.params.index)
                    .child("lastUpdated")
                    .set(currentDate());
            }
        }
        catch (err) {
            //Do Nothing
        }
    }, [bradorData]);

    return (
        <div style={styles.bradorPage}>
            <Backdrop style={styles.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div style={styles.header}>
                <Link to="/" style={styles.brandingName}>Brädor</Link>
                <input
                    type="text"
                    style={styles.bradorTitle}
                    value={bradorTitle}
                    onChange={(e) => { setBradorTitle(e.target.value) }}
                    spellCheck={false}
                />
                <Avatar alt={userAuthData.stageName} src={userAuthData.photoURL} style={styles.photoURL} />
            </div>
            <div style={styles.body}>
                <DragDropContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                >
                    <Droppable droppableId={"lists"} direction="horizontal" type="list">
                        {
                            provided => (
                                <div
                                    style={{ display: "flex" }}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {
                                        bradorData.listorder.map((listID, index) => (
                                            <List key={listID} bradorData={bradorData} listID={listID} index={index} setBradorData={setBradorData} />
                                        ))
                                    }
                                    {provided.placeholder}
                                    <div style={{ ...styles.list, ...styles.listHead }}>
                                        <input type="text" placeholder="New brädor list" style={styles.newNailTitle} value={newListTitle} onChange={(e) => { setNewListTitle(e.target.value) }} />
                                        <IconButton onClick={addList}>
                                            <AddRounded />
                                        </IconButton>
                                    </div>
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}

export default Brador;
