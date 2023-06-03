import Onboarding from 'react-native-onboarding-swiper';
import {Image} from 'react-native';
import React from "react";
import AppContext from "../../Context/AppContext";

function FirstLaunch() {
    const { bg, textColor } = React.useContext(AppContext);
    return (
        <Onboarding
        pages={[
        {
        backgroundColor: bg,
        image: <Image source={require('../../assets/splash.png')} />,
        title: 'Welcome',
        subtitle: 'Welcome to the first slide of the Onboarding Swiper.',
        },
        ]}
    />
    
    );
}

export default FirstLaunch;
