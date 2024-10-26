import React, { useEffect, useRef, useState } from 'react';
import HeaderField from 'components/ShopHeader';
import GoBack from 'components/GoBack';
import Selector from 'components/Selector';
import LeaderList from 'components/LeaderList';
import { LEADERBOARDSQUAD } from 'constants/leaderboardList';
import { useAppSelector } from 'store';
import c from './LeaderboardPage.module.scss';
import { useMemo } from 'react';
// Определение типов
interface ILeaderData {
  coins: number;
  name: string;
  url: string
}

type LeaderRecord = Record<number, ILeaderData>;

export type UserLeaderboard = LeaderRecord[];

interface ILeaderBoard {
  id: number;
  nickname: string;
  coins: number;
  url: string
}

function LeaderboardPage() {
  const { user } = useAppSelector((state) => state.user);
  const [selected, setSelected] = useState<'users' | 'squads'>('users');
  const contentRef = useRef<HTMLDivElement>(null);
  const userLeaders = useAppSelector(state => state.userLeaders.leaders);
  const { squads } = useAppSelector((state) => state.squads);

	const squad = useMemo(() => {
		if (user.squad) {
			return squads.find((squad) => squad.id === user.squad);
		}
		return null;
	}, [user.squad]);
	console.log(userLeaders)
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [selected]);

  const transformToILeaderBoard = (elem: LeaderRecord): ILeaderBoard => {
    const id = Number(Object.keys(elem)[0]);
    const user = elem[id];
    return {
      id: id,
      nickname: user.name,
      coins: user.coins,
      url:user.url
    };
  };

  return (
    <div className={c.container}>
      <div className={c.leaderboard}>
        <HeaderField
          title="leaderboard"
          src="assets/leaderboard/header.png"
          imageStyle={c.image}
          titleStyle={c.title}
        />
        <Selector selected={selected} setSelected={setSelected} />
        <div className={c.outerList}>
          <div className={c.list} ref={contentRef}>
            {selected === 'users' &&
              userLeaders.map((elem:LeaderRecord, index:number) => (
                <LeaderList elem={transformToILeaderBoard(elem)} index={index + 1} key={index} />
              ))}
            {selected === 'squads' &&
              squads.map((elem, index) => (
                <LeaderList elem={elem} index={index + 1} key={index} />
              ))}
          </div>
        </div>
      </div>
      <GoBack />
    </div>
  );
}

export default LeaderboardPage;
