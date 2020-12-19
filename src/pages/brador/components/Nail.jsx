import React from 'react';

import { Draggable } from "react-beautiful-dnd";

import { IconButton } from "@material-ui/core";
import { DragIndicatorRounded, MoreVert } from "@material-ui/icons";
import { styles } from '../styles';

function Nail({ nailData, index }) {
    const { id, content } = nailData;
    return (
        <Draggable draggableId={id} index={index}>
            {
                provided => (
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
                        <span style={styles.nailContent}>{content}</span>
                        <span>
                            <IconButton>
                                <MoreVert />
                            </IconButton>
                        </span>
                    </div>
                )
            }
        </Draggable>
    )
}

export default Nail
