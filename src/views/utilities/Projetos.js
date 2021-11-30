import React, { useCallback, useEffect } from 'react';
// material-ui
import { Grid, Link } from '@material-ui/core';
import MuiTypography from '@material-ui/core/Typography';

// project imports
import SubCard from './../../ui-component/cards/SubCard';
import MainCard from './../../ui-component/cards/MainCard';
import SecondaryAction from './../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from './../../store/constant';

//Projetos

import GSTC from 'gantt-schedule-timeline-calendar';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js';

import 'gantt-schedule-timeline-calendar/dist/style.css';
import './Projetos/App.css';

let gstc, state;


//==============================|| PROJETOS ||==============================//

// helper functions

function generateRows() {
    /**
     * @type { import("gantt-schedule-timeline-calendar").Rows }
     */
    const rows = {};
    for (let i = 0; i < 100; i++) {
      const id = GSTC.api.GSTCID(i.toString());
      rows[id] = {
        id,
        label: `Row ${i}`,
      };
    }
    return rows;
  }
  
  function generateItems() {
    /**
     * @type { import("gantt-schedule-timeline-calendar").Items }
     */
    const items = {};
    // @ts-ignore
    let start = GSTC.api.date().startOf('day').subtract(6, 'day');
    for (let i = 0; i < 100; i++) {
      const id = GSTC.api.GSTCID(i.toString());
      const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 100).toString());
      start = start.add(1, 'day');
      items[id] = {
        id,
        label: `Item ${i}`,
        rowId,
        time: {
          start: start.valueOf(),
          end: start.add(1, 'day').endOf('day').valueOf(),
        },
      };
    }
    return items;
  }
  
  function initializeGSTC(element) {
    /**
     * @type { import("gantt-schedule-timeline-calendar").Config }
     */
    const config = {
      licenseKey:
        '====BEGIN LICENSE KEY====\nFmv681KfyoiBuAoTBB3hyjxRhaLoXXnsCUI51qSDVSCCNAfxF6wuUl1jurRGFOEC11xCSiNk5YfjANzPDoFyR56POG/y2qRPWM2Kz782tE24DyUKXXDISAf8AV3aCsGmwqRKImEXmUQN9tTOxwmAib+NU/yhZPs6LM15aaJ8wBfR4vzrO8nS5Zvx5wT300e94acm/sPX+GWpNfCX53UatOlqxOa5h1mDKIrGagJMPRGGi2DT0sklJxgEjfmGwLpXe1CHrl+aZ29ixN2oBOZuG/DlcE5CTGZNq+GiQvENKKYI+4CqbGBG2VijznzzV43lf408KhBre2fu0iOXpGPaMA==||U2FsdGVkX1+vR4+h/wr62qrwuvGoQdbUmK+OLsMEVVKaXNuK2tlDpW8XSF83aiO/Lc6TUGfGBDwW3UOJxKzsnX04QwSDLb8QTesbRtZtbhc=\nev8XOnHwqR1VwxxyrTFPlCoqkuEgONdnRoak11w1XJkVSYxo/c/1Nfoo2UGMqSG3j/xmZBJLEdH3i7ZvoMGZZkNWFi9hZ0BcWcLnnF1GGQoOQQ3yImVSkFvN6iYqEEZ23yVishaYnK+Ko3q1UhYuT4bM+tAzyhuzIoTzuJo20qrzKQx/5gJ5iPYAi6O+myjAg/dUkVuOc3dR4T2jgw4MD4RFdQNcXVqMwXUPdaME52p0MpNR78D6CF5Q4cADP4FfYC8Da9xFva765gZU0VXwF4itahcJOHlRMjzcTso7JoMTEuDY35qJao0X9TG0smjL2Dz02yX6mV1OElb4n51PKA==\n====END LICENSE KEY====',
      plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
      list: {
        columns: {
          data: {
            [GSTC.api.GSTCID('id')]: {
              id: GSTC.api.GSTCID('id'),
              width: 60,
              data: ({ row }) => GSTC.api.sourceID(row.id),
              header: {
                content: 'ID',
              },
            },
            [GSTC.api.GSTCID('label')]: {
              id: GSTC.api.GSTCID('label'),
              width: 200,
              data: 'label',
              header: {
                content: 'Label',
              },
            },
          },
        },
        rows: generateRows(),
      },
      chart: {
        items: generateItems(),
      },
    };
  
    state = GSTC.api.stateFromConfig(config);
  
    gstc = GSTC({
      element,
      state,
    });
  }
  
  function Projetos() {
    const callback = useCallback((element) => {
      if (element) initializeGSTC(element);
    }, []);
  
    useEffect(() => {
      return () => {
        if (gstc) {
          gstc.destroy();
        }
      };
    });
  
    function updateFirstRow() {
      state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, (row) => {
        row.label = 'Changed dynamically';
        return row;
      });
    }
  
    function changeZoomLevel() {
      state.update('config.chart.time.zoom', 21);
    }
  
    return (
        <MainCard title="Basic Typography" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
            <Grid container spacing={gridSpacing}>
      <div className="App">
        <div className="toolbox">
          <button onClick={updateFirstRow}>Update first row</button>
          <button onClick={changeZoomLevel}>Change zoom level</button>
        </div>
        <div className="gstc-wrapper" ref={callback}></div>
      </div>
      </Grid>
        </MainCard>
    );
  }
  
  export default Projetos;

