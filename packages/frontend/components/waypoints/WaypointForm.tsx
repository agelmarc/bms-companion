import classNames from "classnames";
import { useFormik } from "formik";
import { useEffect } from "react";

import s from "./WaypointForm.module.scss";
import { WAYPOINT_TYPE_DISPLAY } from "const";
import { CreateWaypointDto, Dimension, FormType, WaypointType } from "types";

const INITIAL_VALUES: CreateWaypointDto = {
  description: "",
  dimension: Dimension.Overworld,
  type: WaypointType.BAUWERK_P,
  x: 0,
  y: 0,
  z: 0,
  publish: false,
};

const validate = (values: any) => {
  const errors: any = {};
  if (!values.description) errors.description = true;
  if (!Object.values(Dimension).includes(values.dimension))
    errors.dimension = true;
  if (values.x === "") errors.x = true;
  if (values.y === "") errors.y = true;
  if (values.z === "") errors.z = true;
  return errors;
};
interface WaypointFormProps {
  onSubmit: (values: CreateWaypointDto) => void;
  type?: FormType;
  open?: boolean;
  initialValues?: CreateWaypointDto;
}

const WaypointForm: React.FC<WaypointFormProps> = ({
  onSubmit,
  open = false,
  type = FormType.Default,
  initialValues = INITIAL_VALUES,
}) => {
  const handleSubmit = (values: CreateWaypointDto) => {
    formik.setValues(INITIAL_VALUES);
    onSubmit(values);
  };
  const formik = useFormik({
    initialValues: { ...INITIAL_VALUES, ...initialValues },
    onSubmit: handleSubmit,
    validate,
  });
  useEffect(() => {
    if (initialValues) formik.setValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const classes = (field: keyof CreateWaypointDto) =>
    classNames("focus:border-accent focus:outline-none bg-blue-dark-2", {
      "border-salmon": !!formik.errors[field] && formik.touched[field],
    });
  return (
    <form
      className={classNames(s.form, { [s.visible]: open })}
      onSubmit={formik.handleSubmit}
    >
      <div className={s.grid}>
        <label htmlFor="description">Name</label>
        <input
          className={classes("description")}
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />

        <label htmlFor="type">Typ</label>
        <select
          className={`${classes("type")}`}
          id="type"
          name="type"
          onChange={formik.handleChange}
          value={formik.values.type}
        >
          {Object.entries<string>(WAYPOINT_TYPE_DISPLAY).map(
            ([key, display]) => (
              <option key={key} value={key}>
                {display}
              </option>
            )
          )}
        </select>

        {type != FormType.Mapclick && (
          <>
            <label htmlFor="dimension">Dimension</label>
            <select
              className={`${classes("dimension")}`}
              id="dimension"
              name="dimension"
              onChange={formik.handleChange}
              value={formik.values.dimension}
            >
              <option value={Dimension.Overworld}>Overworld</option>
              <option value={Dimension.Nether}>Nether</option>
              <option value={Dimension.End}>End</option>
            </select>

            <label htmlFor="x">X</label>
            <input
              className={classes("x")}
              id="x"
              name="x"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.x}
            />

            <label htmlFor="y">Y</label>
            <input
              id="y"
              className={classes("y")}
              name="y"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.y}
            />

            <label htmlFor="z">Z</label>
            <input
              id="z"
              className={classes("z")}
              name="z"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.z}
            />
          </>
        )}
      </div>
      <div className={s.bottomrow}>
        <div>
          <input
            id="publish"
            name="publish"
            className="focus:border-accent focus:outline-none mr-1"
            type="checkbox"
            onChange={formik.handleChange}
            value={`${formik.values.publish}`}
          />
          <label htmlFor="publish">Für Jeden Sichtbar</label>
        </div>
        <button className="filled" type="submit">
          Hinzufügen
        </button>
      </div>
    </form>
  );
};

export default WaypointForm;
