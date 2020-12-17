import React from 'react';
import { styles } from './styles';

import { IconButton } from "@material-ui/core";
import { AddRounded as AddRoundedIcon } from '@material-ui/icons';

import { DragDropContext } from "react-beautiful-dnd";

import Bradors from "./components/Bradors";

function Home() {
    const [userInfo, setUserInfo] = React.useState({
        stageName: 'Jaagrav Seal',
        photoURL: "https://avatars3.githubusercontent.com/u/52719271?s=460&u=6013170e3ddd824f72cc8ad4092cdf3bb03da4f9&v=4",
        bradors: [{
            id: "Mjhfsdhfuuiewi324iufeajwew2-",
            title: "Schedule",
            lastUpdated: "6 Dec, 2020",
            created: "2 Dec, 2020"
        }, {
            id: "Mjhfsdajkgjrwi324iufeajwew9-",
            title: "Todos",
            lastUpdated: "9 Dec, 2020",
            created: "5 Oct, 2020"
        }, {
            id: "Mjuaisfyugfuy6edahjdsjasdjsd-",
            title: "Environment",
            lastUpdated: "9 Dec, 2020",
            created: "5 Oct, 2020"
        }, {
            id: "hsidufhew87riujsjdbjasdbahsd",
            title: "School",
            lastUpdated: "9 Dec, 2020",
            created: "5 Oct, 2020"
        }, {
            id: "mkdslmasfhu7yuejrmnwdmnsjdfhsdv",
            title: "TimeTable",
            lastUpdated: "9 Dec, 2020",
            created: "5 Oct, 2020"
        }, {
            id: "MKLdsjiuhisfuhsdf8awydiasuhdjyx-",
            title: "Tempos",
            lastUpdated: "9 Dec, 2020",
            created: "5 Oct, 2020"
        }, {
            id: "LKMjdfsdbufy7uida7sdgaysdbhasdf-",
            title: "Ideas",
            lastUpdated: "9 Dec, 2020",
            created: "5 Oct, 2020"
        }, {
            id: "mlkKShjdvbjkduihsfiusuhjvdcaawui-",
            title: "Dos",
            lastUpdated: "9 Dec, 2020",
            created: "5 Oct, 2020"
        }]
    });
    const { stageName, photoURL, bradors } = userInfo;
    const onDragStart = (result, e) => {
        console.log(result, e)
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

        setUserInfo({ stageName: stageName, photoURL: photoURL, bradors: tempArr });
    }

    React.useEffect(() => {
        console.log("userInfo just updated...")
    }, [userInfo])

    return (
        <div style={styles.homePage}>
            <div style={styles.brandingName}>Brädor</div>
            <div style={styles.bradorsContainer}>
                <div style={styles.bradorsHeader}>
                    <span style={styles.bradorHeaderSpan}>Your Brädors</span>
                    <IconButton>
                        <AddRoundedIcon />
                    </IconButton>
                    <img src={photoURL} alt={stageName} style={styles.photoURL} />
                </div>
                <DragDropContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                >
                    <Bradors bradors={bradors} />
                </DragDropContext>
            </div>
        </div>
    )
}

export default Home;
