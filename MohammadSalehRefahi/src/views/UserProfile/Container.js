import React from 'react'
import SourceBox from './SourceBox'
import TargetBox from './TargetBox'
import Colors from './Colors'
import Dustbin from "./Dustbin";
export default function Container() {
    return (
        <>
        <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
            <div style={{ float: 'left' }}>
                <SourceBox color={Colors.BLUE}>
                    <SourceBox color={Colors.YELLOW}>
                        <SourceBox color={Colors.YELLOW} />
                        <SourceBox color={Colors.BLUE} />
                    </SourceBox>
                    <SourceBox color={Colors.BLUE}>
                        <SourceBox color={Colors.YELLOW} />
                    </SourceBox>
                    {/*<Dustbin greedy={true}/>*/}

                </SourceBox>
            </div>

            <div style={{ float: 'left', marginLeft: '5rem', marginTop: '.5rem' }}>
                <Dustbin greedy={true}>
                    <Dustbin greedy={true}>
                        <Dustbin greedy={true} />
                    </Dustbin>
                    <Dustbin greedy={true} />

                    <Dustbin greedy={true}>
                        <Dustbin greedy={true} />
                    </Dustbin>
                </Dustbin>
            </div>
        </div>
        </>
    )
}
