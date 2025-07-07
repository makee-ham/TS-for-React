[강의 영상](https://www.youtube.com/watch?v=665UnOGx3Pg)

# 1. Defining Props in TypeScript

## 1) Basic usage

```jsx
// basic types
let name: string = "Pedro";
let age: number = 34;
let isMarried: boolean = false;

let ages: number[] = [1, 2, 3, 4, 5];
let person: any = 3; // NOT RECOMMENDED
```

## 2) Interface— the custom type

### How do we define Props with TypeScript?

.ts is for creating types, functions or something like that.

.tsx is for components.

With no type, there is no visible sign of error, even though we wrote “It’s secret” in age…

Won’t mind if it is age 24(Number) or age “24”(String)…

![image](https://github.com/user-attachments/assets/99da5530-d161-444e-8c61-d3abf6fa6e5e)

BUT THIS WOULD CAUSE THE BUG!

This is why we definitely want to define TYPE.

→ we can use `interface` for it

### We can create “Custom Types” with an Object, known as interfaces

```jsx
// Person.tsx
interface Props {
  name: string;
  age: number;
  isMarried: boolean;
}

export const Person = (props: Props) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>This person {props.isMarried ? "is married" : "is single"}</p>
    </div>
  );
};
```

![image](https://github.com/user-attachments/assets/ad452c18-2faf-41cd-b9d8-337c81995a26)

See, now there is an red line indicating type error!

### Export the interface(the custom type) and use it in anywhere

```jsx
export interface Person {
  name: string;
  age: number;
  isMarried: boolean;
}

export const Person = (props: Person) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>This person {props.isMarried ? "is married" : "is single"}</p>
    </div>
  );
};
```

Dealing with data, making query… This Person type might be useful somewhere in our app.

### Using list of the custom type

If you defined Person type by interface & need an array of it,
just use like— `props: Person[]`

### Handling fetched data types’ error

![image](https://github.com/user-attachments/assets/70ccf1f4-1b55-4231-b724-a9d88bbd8382)

TypeScript forces us to handle error EVERYTHING. — great for preventing bugs

---

# 2. Hooks using TypeScript

## 1) 리액트 훅이 갖는 타입의 기본적인 표시법

`*const* [isShowInfo, setShowInfo] = useState(false);` 이렇게만 해도

setShowInfo(”Boolean 이외의 타입”) 하면 기본값이 불린이었으니 그거 인식하고 빨간줄 뜨지만…

아래처럼 타입 명시하는 게 highly recommended 됨

```jsx
const [isShowInfo, setShowInfo] = useState < boolean > false;
```

- 사용자 정보 보여주기 토글 버튼 예시 코드

  ```jsx
  import { useState } from "react";

  export interface Person {
    name: string;
    age: number;
    isMarried: boolean;
  }

  export const Person = (props: Person) => {
    const [isShowInfo, setShowInfo] = useState<boolean>(false);

    const toggleInfo = () => {
      setShowInfo((prev) => !prev);
    };

    return (
      <div>
        {isShowInfo && (
          <>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>This person {props.isMarried ? "is married" : "is single"}</p>
          </>
        )}

        <button onClick={toggleInfo}>Toggle Info</button>
      </div>
    );
  };

  ```

## 2) Unions(유니언) — 허용 타입 여러 개 지정

allowing multiple types

```jsx
const [isShowInfo, setShowInfo] = (useState < boolean) | (null > false);
```

- “|” 로 허용 타입 추가

예시 하나만 추가… 호기심이 자꾸 어려움을 낳네ㅋㅋ

```jsx
let name1: string | null | undefined = "Pedro";
let name2?: string = "Pedro";
```

- name1
  - 선언 시점에 무조건 할당해야 한다. (빈 값 안 됨)
  - 값으로 `string`, `null`, `undefined` 중 하나를 가질 수 있다.
- name2

  - optional(선택적)이므로, name2 자체가 아예 없을 수도 있다. 선언 시점에 값을 할당하지 않아도 된다.
  - 내부적으로는 `name2: string | undefined`와 같다. (얘도 선언 시점에 값 할당 안 해도 됨)
  - `null`은 허용되지 않는다.

- 1의 경우, 왜 null까지 허용했는데 오히려 선언 시점에 할당 안 하면 에러가 뜰까?
  → TS의 strict 모드 동작 철학 때문

## 3) Form Type Event에 대한 타입 지정법

### React.ChangeEvent<HTMLInputElement>— for input types onChange

To handle “onChange” event in input element, it’s type is complicated.

Here is an example of managing controlled (input) component:

```jsx
import { useState } from "react";

export interface Person {
  name: string;
  age: number;
  isMarried: boolean;
}

export const Person = (props: Person) => {
  const [personBio, setPersonBio] = useState<string | null>(null); // rather than ""

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonBio(event.target.value);
  };

  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>This person {props.isMarried ? "is married" : "is single"}</p>

      <p>
        {props.name} Bio: {!personBio ? "No Bio Available" : personBio}{" "}
      </p>
      <input onChange={handleChange} />
    </div>
  );
};

```

### …and of course available for the other Form Events!

ex) onSubmit

```jsx
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
}
```

and so on…

## 4) TypeScript with ContextAPI

일단 interface로 만들고 전역적으로 사용하기 위해 export한 타입은, 특정 컴포넌트 파일 안에 있기보단 컨텍스트를 쓴다면 컨텍스트 쪽에 있는 게 맞으니 그 부분을 옮긴다.

예시로 만들고자 하는 건 좀 weird한 CRUD 앱으로, User 리스트에 유저를 추가, 삭제, 갱신, 조회 등을 할 수 있는 것. (틀만)

```jsx
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
  // UserProvider에서 users 상태와 3개의 함수(addUser, updateUser, deleteUser)를 정의해서 context에 넣어줘야 함 (일단 틀만 맞출 것)
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    // 여기서 보통, data fetch하지만 일단 API 없이 깡데이터 쓰겠음
    setUsers([{ name: "pedro", age: 22, isMarried: false }]);
  }, []);

  const addUser = (user: User) => null;
  const updateUser = (id: string) => null;
  const deleteUser = (id: string) => null;

  // React 19 이전 버전이면 UserContext.Provider 써주기
  return (
    <UserContext value={{ users, addUser, updateUser, deleteUser }}>
      {props.children}
    </UserContext>
  );
};

```

- interface 안에서 함수의 반환 타입 적을 때 무조건 void만 되는 건 당연히 아님. 그냥 타입을 명시적으로 써주면 되는 것.
- children 쓰려면? props에 대해 적용하는 타입에 `children: React.ReactNode` 포함

![image](https://github.com/user-attachments/assets/a522967a-57ab-449f-9d70-5016e1e20d57)

해당 전역 상태… context 쓰려고 하는 데를 감싸주고~

![image](https://github.com/user-attachments/assets/4c6bbfb4-b358-4c0d-92c7-0aa80d9dab5a)

필요한 컴포넌트 안에서 useContext로 Context 불러와서 반환값 맛있게 써먹으면 됨!

그러니까

1. 내가 manipulate할 값들, 즉 이 Context에서 사용할 값들의 타입 정하기
2. Context가 return할 values의 type 정하기
3. 2에서 만든 커스텀 타입을 createContext의 타입으로 넣어서 Context 만들기
4. Provider에 그.. Context의 return values를 value로 넣어보내기

---

# 3. Enum in TypeScript

Enum is the great way to define a specific type of property inside our application.

예를 들어 출신 국가를 입력하는데 그냥 string으로 타입을 정해버리면,
브라질 하나만 해도 brazil, Brazil, BRAZIL, wakanda… 그냥 너무 다양하고 정리할 수 없는 값들이 들어온다…

여기서 enum을 쓰면 우리가 지정한 값으로 깔끔하게 들어올 수 있게 함으로써
정해둔 standard에 맞는 값만 적용할 수 있다.

우리가 보다 값에 대해 controll 할 수 있는 것이다.

```jsx
// User.tsx
interface Props {
  name: string;
  age: number;
  isMarried: boolean;
  country: Countries;
}

export enum Countries {
  Brazil = "Brazil",
  France = "France",
  India = "India",
  UnitedStates = "United States",
}

export const User = (props: Props) => {
  // const { users, updateUser } = useContext(UserContext);

  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>This person {props.isMarried ? "is married" : "is single"}</p>
      <p>Country of Origin: {props.country}</p>
    </div>
  );
};
```

enum은 위와 같이 정의해서 타입으로 사용할 수 있고… 그걸 export해서

```jsx
import "./App.css";
import { User, Countries } from "./User";
import { UserProvider } from "./UserContextProvider";

function App() {
  return (
    <UserProvider>
      <User
        name={"Pedro"}
        age={34}
        isMarried={false}
        country={Countries.Brazil}
      />
      <User
        name={"Colin"}
        age={32}
        isMarried={true}
        country={Countries.India}
      />
    </UserProvider>
  );
}

export default App;
```

요렇게 받아와 쓸 수 있다.

### erasableSyntaxOnly 모드에 의한 에러— “요즘 누가 enum을 써?”

![image](https://github.com/user-attachments/assets/5e2ded74-a0f9-468b-96ba-3dd5420e21df)

`erasableSyntaxOnly`는 타입스크립트가 런타임 JS 코드에 영향을 주는 걸 금지하려는 의도로 만들어졌으며, 런타임에 코드로 남지 않고 타입 체커에만 쓰이는 문법만을 허용한다.

그러나 `enum`은 런타임에 JS 코드를… 정확히는 실제 객체를 만들어버린다.

해결 방법 (택 1)

1. `as const` + union으로 대체
2. tsconfig.json?에서 아무튼 `erasableSyntaxOnly` 꺼버리기

추천 방법: 1

… 정말 필요한 게 아니라면, 런타임에도 남아서 배를 긁고 있는 enum의 사용을 피하자

---

# 4. Converting JS to TS components

예를 들어

```jsx
function UserProfileEditor({ user, onUpdate }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  // 참고로 onUpdate는 반환값은 없는 그저 user 갱신용 함수
  .
  .
  .
```

이런 컴포넌트가 있다면, TS가 타입을 내놓으라고 울부짖을 것이다.

보니까 props로 받는 user는 객체이고, onUpdate는 함수다… 그렇다면 아래와 같이 써볼 수 있겠다.

```jsx
// there are multiple things in user -> user would be an interface as own
interface User {
  name: string;
  email: string;
}

interface Props {
  user: User;
  onUpdate: (user: User) => void;
}

function UserProfileEditor({ user, onUpdate }: Props) {
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);

  .
  .
  .
```

---

## 참고: 유연한 타입 지정, 제너릭 타입(Generic Type)

[다른 분의 벨로그 글](https://velog.io/@mokyoungg/TS-%EC%A0%9C%EB%84%88%EB%A6%ADGeneric)

할당된 값에 따라 유연하게 타입을 결정하여 작동함

→ 재사용성 향상

extends 등으로 타입 제한도 할 수 있어 매우 유용
