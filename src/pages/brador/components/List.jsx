import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { styles } from '../styles';

import { IconButton, Menu, MenuItem, TextareaAutosize } from '@material-ui/core';
import { MoreVert, AddRounded, EditRounded, DeleteForeverRounded } from '@material-ui/icons';

import Nails from "./Nails.jsx";

function List({ bradorData, listID, index, setBradorData }) {
    const listTitleRef = React.useRef();

    const [newNailTitle, setNewNailTitle] = React.useState(""),
        [listTitle, setListTitle] = React.useState(bradorData.lists[listID].title),
        [titleEditable, setTitleEditable] = React.useState(false),
        [listMenu, setListMenu] = React.useState(null);

    React.useEffect(() => {
        let lists = bradorData.lists;
        lists[listID].title = listTitle;

        setBradorData({ ...bradorData, lists: lists });
    }, [listTitle])

    const addNail = () => {
        if (newNailTitle.trim()) {
            const newNailID = `nail-${Object.keys(bradorData.nails).length + 1}`;
            let nails = bradorData.nails;
            const emptyNail = {
                id: newNailID,
                content: newNailTitle
            }
            nails[newNailID] = emptyNail;

            let lists = bradorData.lists;
            if (!lists[listID].nailIDs)
                lists[listID].nailIDs = [];
            let nailIDs = lists[listID].nailIDs;
            nailIDs.push(newNailID);

            setBradorData({ ...bradorData, nails: nails, lists: lists });
            setNewNailTitle("");
        }
    }

    const handleClick = (event) => {
        setListMenu(event.currentTarget);
    };

    const editListTitle = () => {
        setListMenu(null);
        setTitleEditable(true);
    };

    const deleteList = () => {
        setListMenu(null);
        let lists = bradorData.lists;
        delete lists[listID];

        let listorder = bradorData.listorder;
        listorder.splice(listorder.indexOf(listID), 1);

        setBradorData({ ...bradorData, lists: lists, listorder: listorder });
    }

    React.useEffect(() => {
        listTitleRef.current.focus();
    }, [titleEditable]);

    return (
        <>
            <Menu
                anchorEl={listMenu}
                keepMounted
                open={Boolean(listMenu)}
                onClose={(e) => { setListMenu(null) }}
            >
                <MenuItem onClick={editListTitle}><EditRounded />&nbsp;&nbsp;Rename</MenuItem>
                <MenuItem onClick={deleteList}><DeleteForeverRounded />&nbsp;&nbsp;Delete</MenuItem>
            </Menu>
            <Draggable draggableId={bradorData.lists[listID].id} index={index} isDragDisabled={window.innerWidth < 600}>
                {
                    provided => (
                        <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            style={{
                                ...provided.draggableProps.style,
                                ...styles.list
                            }}
                        >
                            <div
                                {...provided.dragHandleProps}
                                style={styles.listHead}
                            >
                                <TextareaAutosize ref={listTitleRef} style={styles.listTitle} value={listTitle} onBlur={() => { setTitleEditable(false) }} onChange={(e) => { setListTitle(e.target.value) }} readOnly={!titleEditable} />
                                <IconButton onClick={handleClick}>
                                    <MoreVert />
                                </IconButton>
                            </div>
                            <div style={styles.nails}>
                                <Nails nailData={bradorData.nails} nailIDs={bradorData.lists[listID].nailIDs} listID={listID} bradorData={bradorData} setBradorData={setBradorData} />
                            </div>
                            <div style={styles.createNail}>
                                <TextareaAutosize type="text" style={styles.newNailTitle} placeholder="New brädor task" spellCheck={false} value={newNailTitle} onChange={(e) => { setNewNailTitle(e.target.value) }} />
                                <span>
                                    <IconButton onClick={addNail}>
                                        <AddRounded />
                                    </IconButton>
                                </span>
                            </div>
                        </div>
                    )
                }
            </Draggable>
        </>
    )
}

export default List;
