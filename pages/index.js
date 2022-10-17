import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";


import {useEffect, useState} from "react";



const firebaseConfig = {
    apiKey: "AIzaSyAUGPYMUbZF4rt5yDbtYHTVSr7Cem07uGM",
    authDomain: "i-teeth.firebaseapp.com",
    projectId: "i-teeth",
    storageBucket: "i-teeth.appspot.com",
    messagingSenderId: "348905133230",
    appId: "1:348905133230:web:44126666ea6af761ce493f",
    measurementId: "G-CRLGC5MJFN"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


export default function Home() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect( () => {
        async function fetchData()  {
            const ref = await getDocs(collection(db, "users"))
            const data = []
            await ref.forEach((doc)=> {
               data.push(doc.data())
            })

           setData(data)

            setLoading(false)


        }
        fetchData().then(()=> {
            console.log('yes')
        })

    }, []);


    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>


            </Head>

            <main className={styles.main}>
                <div>
                    {loading ? 'loading' : <table className="table table-hover table-striped">
                      <thead>
                      <tr className={'table'} style={{padding: '10px'}}>
                          <td>İsim</td>
                          <td>Toplam Fırçalama</td>
                          <td>Arayüz Fırçası</td>
                          <td>Ağız Çalkalama</td>

                      </tr>
                      </thead>
                        <tbody>
                        {data.length > 0 && data?.map((item) => <tr className={'table'} key={data.id}>
                            <td>{item.name}</td>
                            <td>{item?.brushing_diary?.length > 0 ? item.brushing_diary.length : '-'}</td>
                            <td>{item?.brushing_diary?.length > 0 ? item?.brushing_diary?.length + ' / ' + item?.brushing_diary?.filter((i) => i.interface_brush).length : '-'}</td>
                            <td>{item?.brushing_diary?.length > 0 ? item?.brushing_diary?.length + ' / ' + item?.brushing_diary?.filter((i) => i.mouthwash).length : '-'}</td>

                        </tr>)}
                        </tbody>

                    </table>}
                </div>


            </main>

        </div>
    )
}
