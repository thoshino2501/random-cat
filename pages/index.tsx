import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

type Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    // 状態の保存場所定義
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    // ページ読み込み時に実行
    // useEffect(() => {
    //     // fetchImageの非同期処理完了後にthenの中に渡した関数を実行
    //     fetchImage().then((newImage) => {
    //         setImageUrl(newImage.url); // 画像イメージURL変更
    //         setLoading(false); // ローディング状態更新
    //     });
    // }, []);

    // ボタンを押した時の処理
    // データ操作、State更新(画面更新)を行う
    const handleClick = async () => {
        setLoading(true); // 読込中フラグを立てる
        const newImage = await fetchImage();
        setImageUrl(newImage.url); // 画像URLの状態を更新する
        setLoading(false); // 読込中フラグを倒す
    };

    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>\
                きょうのにゃんこ🐱
            </button>
            <div className={styles.frame}>
                {loading || <img src={imageUrl} className={styles.img} />}
            </div>
        </div>
    );
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
      props: {
        initialImageUrl: image.url,
      },
    };
};

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};
