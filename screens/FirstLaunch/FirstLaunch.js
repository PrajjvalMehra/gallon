import Onboarding from 'react-native-onboarding-swiper';
import { Image, Text, TouchableOpacity } from 'react-native';
import React from "react";
import AppContext from "../../Context/AppContext";

function FirstLaunch({navigation}) {
    const { bg, textColor } = React.useContext(AppContext);
    const Done = ({...props}) => (
        <TouchableOpacity
        {...props}
        >
        <Text style={{fontSize:16, marginHorizontal:20}}>Done</Text>
        </TouchableOpacity>
    )
    
    return (
        <Onboarding
            //To handle the navigation to the Homepage if Skip is clicked
            onSkip={() => navigation.replace("Home")}

            //To handle the navigation to the Homepage after Done is clicked
            onDone={() => navigation.replace("Home")}

            DoneButtonComponent={Done}

            pages={[
                {
                    backgroundColor: bg,
                    image: <Image source={require('../../assets/water.png')} />,
                    title: 'Welcome',
                    subtitle: 'With our application, being healthy and slender is easy.',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../../assets/notification.png')} />,
                    title: 'Notifications',
                    subtitle: 'Turn on useful notifications not to forget to drink water.',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('../../assets/target.png')} />,
                    title: 'Dialy Goal',
                    subtitle: 'We will calculate your recommended water intake.',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../../assets/goal.png')} />,
                    title: 'Awards',
                    subtitle: 'Our achivements will motivate you to new achievments  Gool Luck!',
                }
            ]}
        />

    );
}

export default FirstLaunch;
