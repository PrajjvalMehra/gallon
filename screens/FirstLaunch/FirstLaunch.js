import Onboarding from 'react-native-onboarding-swiper';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from "react";
import styles from './styles';
import AppContext from "../../Context/AppContext";

function FirstLaunch({ navigation }) {
    const { bg, textColor } = React.useContext(AppContext);

    //Custom Done button
    const Done = ({ ...props }) => (
        <TouchableOpacity
            {...props}
        >
            <Text style={styles.Done}>Get Started</Text>
        </TouchableOpacity>
    )
    //Customizable dots indicator
    const Dots = ({ selected }) => {
        let backgroundColor;
        backgroundColor = selected ? '#077d9a' : 'black'
        return (
        <View
        style={{
            width:24,
            height:6,
            marginHorizontal:3,
            backgroundColor
        }}
        />
        )
    }

    return (
        <Onboarding
            //To handle the navigation to the Homepage if Skip is clicked
            onSkip={() => navigation.replace("Home")}

            //To handle the navigation to the Homepage after Done is clicked
            onDone={() => navigation.replace("Home")}

            DoneButtonComponent={Done}

            DotComponent={Dots}

            pages={[
                {
                    backgroundColor: bg,
                    image: <Image source={require('../../assets/water.png')} />,
                    title: 'Welcome',
                    titleStyles: styles.Heading,
                    subtitle: 'With our application, being healthy and slender is easy.',
                    subTitleStyles: styles.Subheading,
                },
                {
                    backgroundColor: bg,
                    image: <Image source={require('../../assets/notification.png')} />,
                    title: 'Notifications',
                    titleStyles: styles.Heading,
                    subtitle: 'Turn on useful notifications not to forget to drink water.',
                    subTitleStyles: styles.Subheading,
                },
                {
                    backgroundColor: bg,
                    image: <Image source={require('../../assets/target.png')} />,
                    title: 'Dialy Goal',
                    titleStyles: styles.Heading,
                    subtitle: 'We will calculate your recommended water intake.',
                    subTitleStyles: styles.Subheading,
                },
                {
                    backgroundColor: bg,
                    image: <Image source={require('../../assets/goal.png')} />,
                    title: 'Awards',
                    titleStyles: styles.Heading,
                    subtitle: 'Our achivements will motivate you to new achievments  Good Luck!',
                    subTitleStyles: styles.Subheading,
                }
            ]}
        />

    );
}

export default FirstLaunch;
