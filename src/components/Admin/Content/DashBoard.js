import './DashBoard.scss';
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverview } from '../../../services/apiService';
import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const Dashboard = (props)=>{
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const { t } = useTranslation();

    useEffect(() =>{
      fetchDataOverview();
    }, [])

    const fetchDataOverview =  async() =>{
      let res =  await getOverview();
      if(res && res.EC === 0){
        setDataOverview(res.DT);
        // process chart data
        let Qz = 0, Qs = 0, As = 0;
        Qz = res?.DT?.others?.countQuiz ?? 0;
        Qs = res?.DT?.others?.countQuestions ?? 0;
        As = res?.DT?.others?.countAnswers ?? 0;

        const data = [
          {
            "name": "Quizzes",
            "Qz": Qz
        
          },
          {
            "name": "Questions",
            "Qs": Qs
          
          },
          {
            "name": "Answers",
            "AS": As
        
          }  
        ]
        setDataChart(data)
      }
    }
    const data = [
        {
          "name": "Quizzes",
          "Qz": 4000
      
        },
        {
          "name": "Questions",
          "Qs": 3000
        
        },
        {
          "name": "Answers",
          "AS": 2000,
      
        }  
      ]
      console.log("check dataOver", dataOverview)
        return(
            <div className="dashbroad-container">
                <div className='title'>
                {t('amdin.Dashboard.title0')} 
                </div>
               <div className='content'>
                    <div className='c-left'>
                        <div className='child'>
                          <span className='text-1'> {t('amdin.Dashboard.title1')}  </span>
                          <span className='text-2'>
                              {dataOverview && dataOverview.users
                                && dataOverview.users.total ? 
                                <>{dataOverview.users.total}</> 
                                : 
                                <> 0 </>
                              } 
                            </span>
                           
                        </div>
                        <div className='child'>
                        <span className='text-1'> {t('amdin.Dashboard.title2')}  </span>
                        <span className='text-2'>
                        {dataOverview && dataOverview.others
                                && dataOverview.others.countQuiz ? 
                                <>{dataOverview.others.countQuiz}</> 
                                : 
                                <> 0 </>
                              } 
                        </span>
                          
                        </div>
                        <div className='child'>
                          <span className='text-1'> {t('amdin.Dashboard.title3')}  </span>
                          <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuestions ? 
                                <>{dataOverview.others.countQuestions}</> 
                                : 
                                <> 0 </>
                              }  
                            </span>
                          
                        </div>
                        <div className='child'>
                          <span className='text-1'> {t('amdin.Dashboard.title4')}  </span>
                          <span className='text-2'>
                             
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countAnswers ? 
                                <>{dataOverview.others.countAnswers}</> 
                                : 
                                <> 0 </>
                              } 
                          </span>
                          
                        </div>
                    </div>
                    <div className='c-right'>
                      <ResponsiveContainer  width = {"95%"} height = {"100%"} >      
                    <BarChart width={450} height={280} data={dataChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Qz" fill="#8884d8" />
                        <Bar dataKey="Qs" fill="#2883d8" />
                        <Bar dataKey="AS" fill="#82ca9d" />
                    </BarChart>
                    </ResponsiveContainer>
                    </div>
               </div>
            </div>
        )
}
export default Dashboard;