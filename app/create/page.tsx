/*TODO作成ページ*/

export default function Create() {
  return (
    <div>
      <h1>新しいTODOを作成</h1>
      <form>
        <div>
          <label>タイトル:</label>
          <input type="text" />
        </div>
        <div>
          <label>詳細:</label>
          <textarea />
        </div>
        <button type="submit">作成</button>
      </form>
    </div>
  );
}
