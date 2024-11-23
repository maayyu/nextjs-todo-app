/*TODO一覧ページ*/
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>TODO一覧</h1>
      {/* TODOリストをここに表示 */}
      <ul>
        <li>
          サンプルTODO 1 - <Link href="/details/1">詳細を見る</Link>
        </li>
        <li>
          サンプルTODO 2 - <Link href="/details/2">詳細を見る</Link>
        </li>
      </ul>
      <Link href="/create">新しいTODOを作成</Link>
    </div>
  );
}
