import Dropdown from "../components/Dropdown.tsx";
import deleteIcon from "../assets/delete.svg";

export interface RuleData {
    method?: string,
    condition?: string,
    value?: string,
}

interface RowData {
    index: number,
    data: RuleData,
    handleChange: (key: string, val: string, index: number) => void
    handleDelete: (index: number) => void
}

function Row({index, data, handleChange, handleDelete}: RowData) {
    const isFirst = index === 0;
    console.log(data.condition);
    return (
        <div className="grid grid-cols-7 space-x-7 my-2" key={`row-${index + 1}`}>
            {!isFirst
                ? <div className="font-medium text-sm ml-2">AND</div>
                : <Dropdown
                    name="method"
                    handleChange={(val) => {
                        handleChange('method', val, index)
                    }}
                    options={[
                        {key:"GET", name:"GET"},
                        {key: "POST", name:"POST"},
                        {key: "PUT", name:"PUT"},
                        {key: "PATCH", name:"PATCH"},
                        {key: "DELETE", name:"DELETE"}
                    ]}
                    defaultValue={data.method}
                    data-testid="method"
                    classname="col-span-1 px-2"
                    key="method-dropdown"
                />}
            <Dropdown
                name="condition"
                handleChange={(val) => {handleChange('condition', val, index)}}
                options={[
                    {key:"PATH_STARTS_WITH", name:"path starts with"},
                    {key: "PATH_MATCHES", name:"path matches"},
                    {key: "BODY_MATCHES", name:"body matches"},
                    {key: "HEADER_MATCHES", name:"header matches"},
                ]}
                defaultValue={data.condition}
                data-testid="method"
                classname="col-span-2 px-2"
                key="condition-dropdown"
            />
            <input
                type="text"
                onChange={(val) => handleChange('value', val.target.value, index)}
                className={`${isFirst ? "col-span-4" : "col-span-3"} px-2`} placeholder="eg: /api/path"
                defaultValue={data.value}
            />
            {!isFirst ? (
                <button
                    type="button"
                    className="col-span-1 p-0"
                    onClick={() => {handleDelete(index)}}
                >
                    <img src={deleteIcon} alt="delete"/>
                </button>
            ) : null}
        </div>
    )
}

interface RuleRowsData {
    rowsData: RuleData[],
    handleChange: (key: string, val: string, index: number) => void
    handleDelete: (index: number) => void
}

export default function RuleRows({rowsData, handleChange, handleDelete} : RuleRowsData) {
return (
    <>
    {rowsData.map((data, index) =>
            <Row
                index={index}
                data={data}
                handleChange={handleChange}
                handleDelete={handleDelete}
            />
        )}
    </>
)
}
