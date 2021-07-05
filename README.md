## 添加 utils 至项目中

```
git subtree add -P src/utils/ https://github.com/mouyong/taro-utils.git master

yarn add we-validator
```

## 使用

```scss app.scss
@import "~mp-colorui/dist/index.css";

```

```javascript pages/index/index.jsx
import {
  ClMessage,
} from "mp-colorui";

import * as WeValidator from "../../utils/validator";


const validator = WeValidator.makeValidator(
  {
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
        mobile: true,
      },
      id_card: {
        required: true,
        idcard: true,
      },
      address: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "姓名不能为空",
      },
      phone: {
        required: "手机号码不能为空",
        mobile: "手机号码不正确",
      },
      id_card: {
        required: "身份证不能为空",
        id_card: "身份证不正确",
      },
      address: {
        required: "居住地址不能为空",
      },
    },
  },
  function (data) {
    Taro.showToast({
      icon: "none",
      title: data.msg,
    });
  }
);

export default function Index() {
  const [infoState, setInfoState] = useState({
    name: "",
    phone: "",
    id_card: "",
    address: "",
  });


  const rules = {
    name(rule, value, callback) {
      return WeValidator.checkField(validator, infoState, "name", callback);
    },
    phone(rule, value, callback) {
      return WeValidator.checkField(validator, infoState, "phone", callback);
    },
    id_card(rule, value, callback) {
      return WeValidator.checkField(validator, infoState, "id_card", callback);
    },
    address(rule, value, callback) {
      return WeValidator.checkField(validator, infoState, "address", callback);
    },
  };
  

  const next = () => {
    setStepShape(stepShape > 2 ? 0 : stepShape + 1);
  };

  const prev = () => {
    setStepShape(stepShape == 0 ? 0 : stepShape - 1);
  };

  function handleSubmit() {
    next();

    WeValidator.checkData(validator, data, (result) => {
      await Taro.request({
        url: '/api/user',
        method: 'post',
        data: result,
      })
    })
  }

  function renderStep1FormItem() {
    return (
      <>
        <ClFormItem prop="name" required>
          <ClInput
            pattern="material"
            clear
            title="姓名："
            placeholder="请输入姓名"
            value={infoState.name}
            onBlur={(name) => {
              setInfoState({
                ...infoState,
                name,
              });
            }}
          />
        </ClFormItem>
        <ClFormItem prop="phone" required>
          <ClInput
            pattern="material"
            clear
            title="手机号："
            placeholder="请输入手机号"
            maxLength={11}
            value={infoState.phone}
            onBlur={(phone) => {
              setInfoState({
                ...infoState,
                phone,
              });
            }}
          />
        </ClFormItem>
        <ClFormItem prop="id_card" required>
          <ClInput
            pattern="material"
            clear
            title="身份证号："
            placeholder="请输入身份证号"
            type="idcard"
            value={infoState.id_card}
            onBlur={(id_card) => {
              setInfoState({
                ...infoState,
                id_card,
              });
            }}
          />
        </ClFormItem>
        <ClFormItem prop="address" required>
          <ClInput
            pattern="material"
            clear
            title="居住地址："
            placeholder="请输入居住地址"
            value={infoState.address}
            onBlur={(address) => {
              setInfoState({
                ...infoState,
                address,
              });
            }}
          />
        </ClFormItem>
      </>
    );
  }

  return (
    <ClLayout className="index" style={{ width: "100%" }}>
      <ClTitleBar
        title="资料补充"
        textColor="black"
        type="icon"
        subTitle="type"
      />

      <ClMessage
        message={messageState.message}
        show={messageState.show}
        type={messageState.type}
        onClose={() => setMessageState({ ...messageState, show: false })}
      />

      <ClCard>
        <ClStep
          steps={steps}
          type="arrow"
          step={stepShape}
          activeColor="blue"
        />
      </ClCard>

      {(() => {
        const stepShapeRenderItemMap = {
          0: renderStep1FormItem,
        };

        if (stepShapeRenderItemMap[stepShape]) {
          return (
            <ClCard>
              <ClForm
                className=""
                model={{ ...infoState, }}
                rules={rules}
              >
                {stepShapeRenderItemMap[stepShape]()}
              </ClForm>
            </ClCard>
          );
        }

        return null;
      })()}
      <ClLayout padding="normal" paddingDirection="around">
        {(() => {
          if (stepShape === 3) {
            // return null
          }
          
          if (stepShape < 2) {
            if (stepShape === 0) {
              return <ClButton text="下一步" long onClick={next} />;
            } else {
              return (
                <>
                  <ClLayout>
                    <ClButton text="下一步" long onClick={next} />
                  </ClLayout>
                  <ClLayout margin="small" marginDirection="top">
                    <ClButton text="上一步" long bgColor="grey" onClick={prev} />
                  </ClLayout>
                </>
              );
            }
          }

          return (
            <>
            <ClLayout>
              <ClButton text="提交" long onClick={handleSubmit} />
            </ClLayout>
            <ClLayout margin="small" marginDirection="top">
              <ClButton text="上一步" long bgColor="grey" onClick={prev} />
            </ClLayout>
            </>
          );
        })()}
      </ClLayout>
    </ClLayout>
  );
}
```
