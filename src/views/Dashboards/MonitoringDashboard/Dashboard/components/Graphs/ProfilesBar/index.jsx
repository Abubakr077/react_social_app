import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart,
} from 'recharts';

// local json
import hatePoolTwitterProfiles
    from '../../JobAnalysis/data/500_hate_pool_TWITTER_USER_POST_2019-09-21.json';
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";

let data = hatePoolTwitterProfiles;
data = data.slice(0, 50);

export default class ProfileBar extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="100%">
            <BarChart
                width={1200}
                height={800}
                data={data}
                margin={{ top: 20, right: 50, left: 90, bottom: 0 }}
                layout="vertical"
            >
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <XAxis  type={ 'number' } orientation={ 'top' }  />
                <YAxis dataKey="user_screen_name" type={ 'category' }  interval="preserveStartEnd"/>
                {/*<CartesianGrid strokeDasharray="2 2" />*/}
                <Tooltip />
                <Bar dataKey="freq" name="Hate " fill="#0767DB" radius={[0, 20, 20, 0]} />
                <Brush
                    height={20}
                    dataKey="date"
                    stroke="#0767DB"
                />
            </BarChart>
            </ResponsiveContainer>
        );
    }
}