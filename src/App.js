import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import {useDispatch, useSelector} from 'react-redux'
import { resetUser, updateUser } from './redux/slides/userSlide';
import Loading from './components/LoadingComponent/Loading';


function App() {

  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false)
  const user = useSelector((state) => state.user)

  const handleGetDetailsUser = useCallback(async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  }, [dispatch]);
  
  useEffect(() => {
    setIsPending(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    } else {
      dispatch(resetUser());
      localStorage.removeItem('access_token');
    }
    setIsPending(false);
  }, [dispatch, handleGetDetailsUser]);
  
  
  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    // console.log("storageData" , storageData, isJsonString(storageData))
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) =>{
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Loading isPending={isPending}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const ischeckAuth = !route.isPrivate || user.isAdmin;
            const Layout = route.isShowHeader ? (props) => (
              <DefaultComponent isShowFooter={route.isShowFooter}>
                {props.children}
              </DefaultComponent>
            ) : React.Fragment;

            return (
              <Route
                key={route.path}
                path={ischeckAuth ? route.path : undefined}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
      </Loading>
    </div>
  );
}

export default App;
