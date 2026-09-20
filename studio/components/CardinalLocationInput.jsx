import React, { useEffect, useId, useState } from "react";
import { Flex, Select, Stack, Text, TextInput } from "@sanity/ui";
import { PatchEvent, set, unset } from "sanity";

export default function CardinalLocationInput({ value, onChange, readOnly, elementProps }) {
  const id = useId();
  const latitude = value?.lat;
  const longitude = value?.lng;
  const [directions, setDirections] = useState(() => ({
    lat: latitude < 0 ? "S" : "N",
    lng: longitude < 0 ? "W" : "E",
  }));

  // Sanity echoes patches asynchronously. Don't reset a selection from the old
  // coordinate on every render; sync only when the stored coordinate changes.
  useEffect(() => {
    setDirections((current) => ({
      ...current,
      lat: latitude ? (latitude < 0 ? "S" : "N") : current.lat,
    }));
  }, [latitude]);
  useEffect(() => {
    setDirections((current) => ({
      ...current,
      lng: longitude ? (longitude < 0 ? "W" : "E") : current.lng,
    }));
  }, [longitude]);

  function updateCoordinate(axis, magnitude, direction) {
    if (!Number.isFinite(magnitude)) {
      onChange(PatchEvent.from(unset([axis])));
      return;
    }
    const sign = direction === "S" || direction === "W" ? -1 : 1;
    onChange(
      PatchEvent.from(set({ ...value, _type: "geopoint", [axis]: Math.abs(magnitude) * sign }))
    );
  }

  return (
    <Stack space={4}>
      {[
        {
          axis: "lat",
          title: "Latitude",
          max: 90,
          options: [
            ["N", "N — North"],
            ["S", "S — South"],
          ],
        },
        {
          axis: "lng",
          title: "Longitude",
          max: 180,
          options: [
            ["E", "E — East"],
            ["W", "W — West"],
          ],
        },
      ].map(({ axis, title, max, options }, index) => (
        <Stack space={2} key={axis}>
          <Text as="label" htmlFor={`${id}-${axis}`} size={1}>
            {title} (degrees)
          </Text>
          <Flex gap={2}>
            <TextInput
              {...(index === 0 ? elementProps : {})}
              id={`${id}-${axis}`}
              type="number"
              min={0}
              max={max}
              step="any"
              readOnly={readOnly}
              value={Number.isFinite(value?.[axis]) ? Math.abs(value[axis]) : ""}
              onChange={(event) =>
                updateCoordinate(
                  axis,
                  event.currentTarget.value === "" ? NaN : Number(event.currentTarget.value),
                  directions[axis]
                )
              }
            />
            <Select
              aria-label={`${title} direction`}
              value={directions[axis]}
              disabled={readOnly}
              onChange={(event) => {
                const direction = event.currentTarget.value;
                setDirections((current) => ({ ...current, [axis]: direction }));
                if (Number.isFinite(value?.[axis])) updateCoordinate(axis, value[axis], direction);
              }}
            >
              {options.map(([direction, label]) => (
                <option key={direction} value={direction}>
                  {label}
                </option>
              ))}
            </Select>
          </Flex>
        </Stack>
      ))}
      <Text size={1} muted>
        Use positive decimal degrees, then choose N/S and E/W. For example, Vancouver is 49.2827 N,
        123.1207 W.
      </Text>
    </Stack>
  );
}
