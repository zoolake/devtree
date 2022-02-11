// 로딩 기능

  // 검색 기능
  const [searchWord, setWord] = useState("");
  const onChange = (event) => setWord(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (searchWord === "") {
      return;
    }
    console.log(searchWord);
    setWord("");
  }

  // 조회 기능
  const [projectList, setProjectList] = useState([]);
  const getProjectList = async () => {
    const pList = await (
      await fetch() // api 받아오기
    ).json();
    setProjectList(pList);
    console.log(projectList);
  }
  useEffect(() => {
    getProjectList()
    // setProjectList([...projectList, {}])
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            value={searchWord}
            type="text"
            placeholder="프로젝트 제목 검색"
          />
          <button>Search</button>
        </form>
      </div>
      
      <div>
        {projectList ? 
        <ul>
          <li>
            {projectList.map(project =>
              <div key={project.id}>
                프로젝트: {project.data.team_seq}
                작성자: {project.data.team_name}
              </div>  
            )}
          </li>

        </ul> : null}
      </div>
      <div className="app">
        <FaProjectDiagram style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Project Page!</span>
      </div>
      <div style={{ float: "right" }}></div>
    </div>
  );