import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';
import React from "react";
import AppContext from "../../Context/AppContext";

function FirstLaunch({navigation}) {
    const { bg, textColor } = React.useContext(AppContext);
    return (
        <Onboarding
            //To handle the navigation to the Homepage if Skip is clicked
            onSkip={() => navigation.replace("Home")}

            //To handle the navigation to the Homepage after Done is clicked
            onDone={() => navigation.replace("Home")}

            pages={[
                {
                    backgroundColor: bg,
                    image: <Image source={require('../../assets/favicon.png')} />,
                    title: 'Welcome',
                    subtitle: 'Welcome to the first slide of the Onboarding Swiper.',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../../assets/favicon.png')} />,
                    title: 'Explore',
                    subtitle: 'This is the second slide of the Onboarding Swiper.',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('../../assets/favicon.png')} />,
                    title: 'All Done',
                    subtitle: 'This is the Third slide of the Onboarding Swiper.',
                }
            ]}
        />

    );
}

export default FirstLaunch;
