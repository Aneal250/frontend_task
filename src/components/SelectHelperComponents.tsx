import { components } from "react-select";

const renderNestedOption = (props: any, label: any, nestedOptions: any) => {
  const { innerProps, selectOption } = props;

  return (
    <div className="nested-optgroup">
      <div
        style={{
          color: "grey",
          paddingLeft: "20px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        {label}
      </div>
      {nestedOptions.map((nestedOption: any, i: any) => {
        if (nestedOption.categories) {
          return renderNestedOption(
            props,
            nestedOption.name,
            nestedOption.categories
          );
        }
        const nestedInnerProps = {
          ...innerProps,
          onClick: () => selectOption(nestedOption),
        };
        return (
          <components.Option
            {...props}
            key={String(`${i}`)}
            innerProps={nestedInnerProps}
          >
            {nestedOption.name}
          </components.Option>
        );
      })}
    </div>
  );
};

export const Option = (props: any) => {
  const { children, data } = props;
  const nestedOptions = data.categories;
  if (nestedOptions) {
    const label = data.name;
    return renderNestedOption(props, label, nestedOptions);
  }
  return <components.Option {...props}>{children}</components.Option>;
};
