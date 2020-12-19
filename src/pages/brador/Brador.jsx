import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './styles';

import { auth, database } from '../../components/firebase';

import { Avatar } from "@material-ui/core";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./components/List";

function Brador(props) {
    const [bradorTitle, setBradorTitle] = React.useState("");
    const [userAuthData, setUserAuthData] = React.useState({
        uid: "",
        displayName: "",
        photoURL: "",
    });
    const [bradorData, setBradorData] = React.useState({
        nails: {
            'nail-1': { id: 'nail-1', content: 'Get a haircut' },
            'nail-2': { id: 'nail-2', content: 'Drink Coffee' },
            'nail-3': { id: 'nail-3', content: 'Finish work on Brador' },
            'nail-4': { id: 'nail-4', content: 'Create gig on Fiverr' },
            'nail-5': { id: 'nail-5', content: 'Attend Rappa Maam\'s tution' },
            'nail-6': { id: 'nail-6', content: 'Physics Tution@6' }
        },
        lists: {
            'list-1': {
                id: 'list-1',
                title: 'Important ToDo',
                nailIDs: ['nail-1', 'nail-2', 'nail-3', 'nail-4']
            },
            'list-2': {
                id: 'list-2',
                title: 'Tutions to attend',
                nailIDs: ['nail-5', 'nail-6']
            }
        },
        listorder: ['list-1', 'list-2']
    });

    const onDragStart = () => {
        console.log("Drag started...")
    }
    const onDragEnd = () => {
        console.log("Drag ended...")
    }

    React.useEffect(() => {
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log(props.match.params.index);
                database
                    .child(firebaseUser.uid)
                    .child("my_bradors")
                    .child(props.match.params.index)
                    .once("value")
                    .then(snap => {
                        setBradorTitle(snap.val().title)
                    })
                setUserAuthData({ uid: firebaseUser.uid, stageName: firebaseUser.displayName, photoURL: firebaseUser.photoURL });
            } else {
                setUserAuthData({ uid: "", stageName: "", photoURL: "" });
            }
        })
    }, [])

    React.useEffect(() => {
        try {
            console.log(userAuthData.uid, props.match.params.id);
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

    return (
        <div style={styles.bradorPage}>
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
                <DragDropContext>
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
                                            <List bradorData={bradorData} listID={listID} index={index} />
                                        ))
                                    }
                                    {provided.placeholder}
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
