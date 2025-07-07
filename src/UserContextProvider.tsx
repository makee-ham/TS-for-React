import { createContext, useEffect, useState } from "react";

export interface User {
  name: string;
  age: number;
  isMarried: boolean;
}

interface UserContextType {
  users: User[] | null; // API fetch로 가져오기 전에는 null
  addUser: (user: User) => void; // interface 안에서 함수 정의 시 함수의 return type을 반드시 명기해야 하는데, user를 추가하고 딱히 반환값이 없는 이 경우엔 void를 적어줌
  updateUser: (id: string) => void;
  deleteUser: (id: string) => void;
}

const contextInitialValues = {
  users: null,
  addUser: () => null,
  updateUser: () => null,
  deleteUser: () => null,
};

// context에는 UserContextType에 맞는 object 초기값이 필요하기에 대강 맞춰서 초기값 넣어줌
export const UserContext = createContext<UserContextType>(contextInitialValues);

// UserProvider 사이의 children 컴포넌트를 원함 -> React.ReactNode
interface Props {
  children: React.ReactNode;
}

export const UserProvider = (props: Props) => {
  // UserProvider에서 users 상태와 3개의 함수(addUser, updateUser, deleteUser)를 정의해서 context에 넣어줘야 함
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    // 여기서 data fetch하지만 일단 더미 데이터 쓰겠음
    setUsers([{ name: "pedro", age: 22, isMarried: false }]);
  }, []);

  const addUser = (user: User) => null;
  const updateUser = (id: string) => null;
  const deleteUser = (id: string) => null;

  // 19 이전 버전이면 UserContext.Provider 써주기
  return (
    <UserContext value={{ users, addUser, updateUser, deleteUser }}>
      {props.children}
    </UserContext>
  );
};
