import React  from 'react';
import { Container, Table, Tab, Tabs } from 'react-bootstrap';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import datas from '../dbdata/data.js';
import categorys from "../dbdata/category";
import { useState } from 'react'
function AdminTab() {



  const [key, setKey] = useState('all');
  return (

    <Container>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        defaultActiveKey="all"
        className="mb-3"
      // style={{ display: 'flex', listStyle: 'none', border: '2px solid red' }}
      >
        <Tab eventKey="all" title="all">
          <Table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Title</th>
                <th>Preview</th>
                <th>Setting</th>
              </tr>
            </thead>
            <tbody>
              {
                datas.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.category}</td>
                      <td>{item.title}</td>
                      <td><img src={item.src} className="xx" /></td>
                      <td>
                        {/* 모달로 구현 */}
                        <ChangeCircleIcon fontSize="large" onClick={() => { alert('수정') }} />
                        <RemoveCircleIcon fontSize="large" onClick={() => { alert('삭제') }} />
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>
        </Tab>
        {
          categorys.sort(categorys.ordernum).map((item, i) => {
            return (
              <Tab eventKey={item.category} title={item.category} key={i}>
                <Table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Title</th>
                      <th>Preview</th>
                      <th>Setting</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      datas.filter(v => v.category === item.category).map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item.category}</td>
                            <td>{item.title}</td>
                            <td><img src={item.src} className="xx" /></td>
                            <td>
                              {/* 모달로 구현 */}
                              <ChangeCircleIcon fontSize="large" onClick={() => { alert('수정') }} />
                              <RemoveCircleIcon fontSize="large" onClick={() => { alert('삭제') }} />
                            </td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </Table>
              </Tab>
            )
          })
        }
        <Tab eventKey={'setting'} title={<SettingsIcon fontSize="medium" />}>
          <div className="setting">
            <p>탭 생성</p>
            <input type="text" /><button>생성</button>
            <br /><br />
            <p>탭 삭제(주의 - 해당 탭의 전체 게시물이 삭제됩니다)</p>
            <select>
              {
                categorys.map((item, i) => {
                  return (
                    <option>{item.category}</option>
                  )
                })
              }
            </select>
            <button>삭제</button>
            <br /><br />
            <p>탭 순서 변경(about - all - @Setting@ - shop)</p>
            <form>
              {
                categorys.map((item, i) => {
                  return (
                    <div key={i}>
                      <p>{item.category}</p>
                      <input type="text" defaultValue={item.ordernum} />
                    </div>

                  )
                })
              }
              <br />
              <button>변경</button>
            </form>
          </div>
        </Tab>
      </Tabs>
    </Container>

  );
}



export default AdminTab;

