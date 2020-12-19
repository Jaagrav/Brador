import React from 'react';

import { Draggable, DragDropContext } from 'react-beautiful-dnd';

import { styles } from '../styles';

import { IconButton } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons';

import Nails from "./Nails.jsx";

function List({ bradorData, listID, index }) {
    return (
        <Draggable draggableId={bradorData.lists[listID].id} index={index}>
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
                            <div style={styles.listTitle}>{bradorData.lists[listID].title}</div>
                            <IconButton>
                                <MoreVert />
                            </IconButton>
                        </div>
                        <div style={styles.nails}>
                            <Nails nailData={bradorData.nails} nailIDs={bradorData.lists[listID].nailIDs} listID={listID} />
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default List;
