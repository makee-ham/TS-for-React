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

![image.png](attachment:da2a3d75-8e77-4e25-bfaf-207f6e2faf42:image.png)

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

![image.png](attachment:b4d6a88f-d019-41de-a19a-3677360ecf3a:image.png)

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

![image.png](attachment:b716b355-bebf-4e84-bfa1-6f7f0f54b944:image.png)

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
  → TS의 strict 모드 동작 철학 때문 ## 🩷 핵심: `strictNullChecks` + `strictPropertyInitialization`

      타입스크립트 프로젝트에서 `tsconfig.json`에 보통 이렇게 되어 있지?

      ```json
      json
      CopyEdit
      {
        "compilerOptions": {
          "strict": true}
      }

      ```

      여기에는 두 가지가 같이 켜져 있어:

      - `strictNullChecks`
      - `strictPropertyInitialization`

      ---

      ### 📌 `strictNullChecks`

      - `null`과 `undefined`를 자동으로 허용하지 않는다.
      - 타입에 명시해야만 허용됨.
      - 그래서 `string | null | undefined` 이렇게 명시했기 때문에 타입적으로는 **null/undefined 허용이 맞아.**

      ---

      ### 📌 그럼에도 “초기화”를 요구하는 이유: `strictPropertyInitialization`

      - **클래스의 경우**: 생성자에서 초기화를 하지 않으면 에러.
      - **지역 변수의 경우**: 선언 후 초기화를 하지 않으면 `undefined`일 가능성이 있어도 컴파일러가 경고한다.
      - 왜냐면 타입스크립트는 `let name1: string | null | undefined;` 라고 하면

          > 값이 undefined일 수도 있는데, 아무 값도 없이 쓰면 런타임에서 못 잡고 터질 수도 있어
          >
          >
          > 라고 생각하기 때문이야.
          >

      즉, `string | null | undefined`라고 썼더라도, 그건 “값을 준다면 이런 타입 중 하나여야 한다”일 뿐이지

      **초기화가 필요 없다는 뜻은 아냐.**

      ---

      ## 🚧 그런데 `name2?: string`는 왜 초기화를 안 해도 되나?

      여긴 약간 문법 차이야:

      - `?` 표기는 아예 속성이 없을 수도 있다는 뜻이라, `undefined` 상태를 허용하면서도 “초기화 안 됐어도 됨”으로 인식한다.
      - 반대로 `name1`은 선언 자체는 됐는데 값을 안 넣으면 안 된다고 보는 거야.

      ---

      ## 🧪 정리

      | 코드 | 초기화 필요 여부 | 이유 |
      | --- | --- | --- |
      | `let name1: string | null | undefined;` |
      | `let name2?: string;` | ❌ 불필요 | 속성 자체가 선택적(`undefined`) |

      ---

      ### 📌 비판적으로 보면

      이건 “변수”와 “속성”의 문법 차이 때문이기도 하고, 타입스크립트가 조금 더 안전하게 하려는 설계 때문이야.

      만약 `name1`도 초기화를 생략하고 싶다면:

      ```
      ts
      CopyEdit
      let name1: string | null | undefined = undefined;

      ```

      이렇게 명시적으로 `undefined`로 초기화하면 돼.

- 더 쉬운 설명…
  이 현상은 **많이들 헷갈리는 타입스크립트의 함정(?)같은 부분**이야.
  왜 그런지, 차근히 뜯어볼게.

  ***

  ## 🔍 너가 본 현상:

  ```
  ts
  CopyEdit
  let name: string | undefined; // 선언만 가능, 초기화 안 해도 됨
  let name: string | null | undefined; // 초기화 안 하면 에러

  ```

  같아 보이는데, 왜 `null`을 추가하면 에러가 날까?

  ***

  ## 🌸 이유: 타입스크립트의 추론 + strict 모드

  ### 1️⃣ `let name: string | undefined`

  `let` 변수는 선언만 하면 런타임에서 `undefined`로 초기화돼.
  그리고 타입에 `undefined`가 포함돼 있으니 타입스크립트는

  > “아~ 넌 지금 undefined인 게 허용되는 타입이네. 오케이~”
  >
  > 라고 생각해.

  ***

  ### 2️⃣ `let name: string | null | undefined`

  여기도 엄밀히 말하면 선언만 하고 초기화하지 않으면 런타임 값은 여전히 `undefined`야.
  근데 타입스크립트 strict 모드에선 이렇게 생각해:

  > “너 타입이 string | null | undefined네? 근데 현재 값이 undefined인 건 알겠어. 하지만 너 정말 undefined를 원한 거야? null이 초기값이었어야 하는 거 아냐? 모르겠다. 불명확하다.”
  > 그래서 **“명시적으로 초기화해라”** 라고 강요해.

  ***

  ## 🔍 왜 `null`을 넣으면 더 엄격해지지?

  사실 **논리적으로는 더 엄격해질 이유가 없는데, 타입스크립트의 보수적인 타입 체크 때문이야.**
  `string | null | undefined`인데 `undefined`인 상태에서 초기화 안 한 걸 잡아내려는 의도야.
  정확히는 strict 설정에서의 동작 특성이야.

  ***

  ## 💡 해결책

  ✅ 초기화 시켜주면 된다:

  ```
  ts
  CopyEdit
  let name: string | null | undefined = undefined;

  ```

  혹은

  ```
  ts
  CopyEdit
  let name: string | null | undefined = null;

  ```

  ***

  ## 🧪 비판적으로 생각해보면

  - `null`까지 포함시키는 게 진짜 필요한지 한 번 고민해보는 게 좋아.
  - `undefined`만으로도 “아직 값이 없음”을 충분히 표현할 수 있어.
  - `null`은 보통 “명시적으로 비어있다”를 표현할 때 더 어울려.

  ***

  ### ✨ 정리

  > 타입스크립트가 보수적이라서 그렇지, 논리적으로 null을 추가했다고 선언만 못할 이유는 없어.
  >
  > 하지만 strict 모드에서 “더 명확히 해라” 라고 체크하는 것뿐이야.

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

- interface 안에서 함수의 반환 타입 적을 때 무조건 void만 되는 건 당연히 아님
  `interface` 안에서 함수의 반환 타입을 적어야 할 때, **무조건 `void`여야 하냐?**라는 거지?

  ***

  ## 🩷 정답: **아니야. 무조건 `void`일 필요 없어.**

  `interface` 안에서 함수 타입을 정의할 때는

  > “이 함수는 어떤 타입을 반환해야 한다”
  >
  > 를 명시하는 게 목적이지, `void`만 가능한 건 아니야.

  ***

  ### ✅ 예시

  ### void 반환

  ```
  ts
  CopyEdit
  interface Example {
    doSomething: () => void;
  }

  ```

  → 아무것도 반환하지 않는 함수.

  ***

  ### string 반환

  ```
  ts
  CopyEdit
  interface Example {
    getName: () => string;
  }

  ```

  → 문자열을 반환해야 하는 함수.

  ***

  ### Promise 반환

  ```
  ts
  CopyEdit
  interface Example {
    fetchData: () => Promise<User[]>;
  }

  ```

  → 비동기 함수라면 `Promise<…>`도 가능.

  ***

  ## 💡 왜 `void`를 많이 쓰는가?

  많은 상태 관리 패턴(Context, Redux 등)에서는 “값을 바꾸는 액션”을 정의할 때, 주로 `void`를 반환하도록 하기 때문이야.
  예를 들어 `addUser`는 사용자 배열에 추가만 하고 아무것도 반환하지 않는 게 일반적이니까 `void`로 쓰는 것뿐.

  ***

  ## 🧪 비판적으로 보면

  `addUser: (user: User) => void`가 정말로 아무것도 반환하지 않아야 맞는지, 아니면

  - 새로운 사용자 배열을 반환하는지
  - 성공/실패 여부를 반환하는지
  - 비동기 처리하는지
    를 설계 의도에 따라 명확히 하는 게 더 중요해.

  ***

  ### ✨ 정리

  ✅ `interface` 안에서 함수는 어떤 타입이든 반환 가능.
  ✅ `void`는 그냥 의도적으로 반환값이 없다고 선언한 것일 뿐.
  ✅ Context API에서 주로 `void`를 많이 볼 뿐, 무조건 그럴 필요는 없어.

- children 쓰려면? props에 대해 적용하는 타입에 `children: React.ReactNode` 포함

![image.png](attachment:625df535-e108-4dcd-8aa9-a24847e0cbeb:image.png)

해당 전역 상태… context 쓰려고 하는 데를 감싸주고~

![image.png](attachment:6e38d5ef-81e1-46d9-8154-6a4117331534:image.png)

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

![image.png](attachment:14ed0a32-81fe-4349-8c64-513ffbefcd82:image.png)

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

https://velog.io/@mokyoungg/TS-%EC%A0%9C%EB%84%88%EB%A6%ADGeneric

할당된 값에 따라 유연하게 타입을 결정하여 작동함

→ 재사용성 향상

extends 등으로 타입 제한도 할 수 있어 매우 유용
