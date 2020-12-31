import React from 'react';

import { Draggable } from "react-beautiful-dnd";

import { IconButton, Menu, MenuItem, TextareaAutosize } from "@material-ui/core";
import { DragIndicatorRounded, MoreVert, EditRounded, DeleteForeverRounded } from "@material-ui/icons";
import { styles } from '../styles';

function Nail({ nailData, nailID, index, listID, bradorData, setBradorData }) {
    const contentRef = React.useRef();
    const { id, content } = nailData;
    const [nailContent, setNailContent] = React.useState(content),
        [nailMenu, setNailMenu] = React.useState(null),
        [titleEditable, setTitleEditable] = React.useState(false);

    const editNailTitle = () => {
        setNailMenu(null);
        setTitleEditable(true);
    }

    const deleteNail = () => {
        setNailMenu(null);

        let lists = bradorData.lists;
        let nails = bradorData.nails;
        delete nails[lists[listID].nailIDs[index]];

        lists[listID].nailIDs.splice(index, 1);

        setBradorData({ ...bradorData, lists: lists, nails: nails })
    }

    React.useEffect(() => {
        let nails = bradorData.nails;

        nails[nailID].content = nailContent;

        setBradorData({ ...bradorData, nails: nails })
    }, [nailContent]);

    React.useEffect(() => {
        if (titleEditable)
            contentRef.current.focus();
        else
            document.body.focus();
    }, [titleEditable])

    return (
        <Draggable draggableId={id} index={index}>
            {
                provided => (
                    <>
                        <Menu
                            anchorEl={nailMenu}
                            keepMounted
                            open={Boolean(nailMenu)}
                            onClose={(e) => { setNailMenu(null) }}
                        >
                            <MenuItem onClick={editNailTitle}><EditRounded />&nbsp;&nbsp;Rename</MenuItem>
                            <MenuItem onClick={deleteNail}><DeleteForeverRounded />&nbsp;&nbsp;Delete</MenuItem>
                        </Menu>
                        <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            style={{
                                ...provided.draggableProps.style,
                                ...styles.nail
                            }}
                        >
                            <span
                                {...provided.dragHandleProps}
                                style={styles.nailDragHandle}
                            >
                                <DragIndicatorRounded style={styles.dragIcon} />
                            </span>
                            <TextareaAutosize ref={contentRef} title={nailContent} style={{ ...styles.nailContent, ...styles.nailTitle }} value={nailContent} onChange={(e) => { setNailContent(e.target.value) }} readOnly={!titleEditable} onBlur={(e) => { setTitleEditable(false) }} />
                            <span>
                                <IconButton onClick={(event) => { setNailMenu(event.currentTarget) }}>
                                    <MoreVert />
                                </IconButton>
                            </span>
                        </div>
                    </>
                )
            }
        </Draggable>
    )
}

export default Nail
