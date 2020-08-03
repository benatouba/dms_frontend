export const er = {
    fatal: [
        'Can not access the version attribute.',
        'Can not build a standart name.',
        {
            site: ['This field is required.'],
            acronym: ['This field is required.'],
            file_standard_name: ['This field may not be null.'],
            author: ['This field is required.'],
            source: ['This field is required.'],
            institution: ['This field is required.'],
            version: ['This field may not be null.'],
            featureType: ['This field is required.'],
            data_content: ['This field is required.'],
            location: ['This field is required.'],
            origin_lon: ['This field is required.'],
            origin_lat: ['This field is required.'],
            campaign: ['This field is required.'],
            creation_time: ['This field is required.'],
            origin_time: ['This field is required.'],
            licence: ['This field is required.'],
        },
    ],
    errors: [
        {
            cfchecks: [
                {
                    crs: [
                        '(5.6): Attribute semi_major_axis of incorrect data type (Appendix F)',
                        '(5.6): Attribute inverse_flattening of incorrect data type (Appendix F)',
                        '(5.6): Attribute longitude_of_prime_meridian of incorrect data type (Appendix F)',
                        '(5.6): Attribute longitude_of_central_meridian of incorrect data type (Appendix F)',
                        '(5.6): Attribute scale_factor_at_central_meridian of incorrect data type (Appendix F)',
                        '(5.6): Attribute latitude_of_projection_origin of incorrect data type (Appendix F)',
                        '(5.6): Attribute false_easting of incorrect data type (Appendix F)',
                        '(5.6): Attribute false_northing of incorrect data type (Appendix F)',
                    ],
                },
            ],
        },
        {
            data_content: [
                "Only one data variable found. 'mcpm'. Expected global attribute 'data_content' to be 'mcpm'.",
            ],
        },
        {
            version: [
                "Global attribute 'version' has wrong type. Should be one of the following: int, int8, int16, int32, int64. Found type: str",
            ],
        },
        {
            rotation_angle: [
                "Global attribute 'rotation_angle' has wrong type. Should be one of the following: float, float16, float32, float64. Found type: str",
            ],
        },
        {
            institution: ["Global attribute 'institution' has wrong value. Found value: test"],
        },
        {
            acronym: ["Global attribute 'acronym' has wrong value. Found value: test"],
        },
        {
            author: ["Global attribute 'author': Persons must be given as last_name, first_name[, email]"],
        },
        {
            time: [
                {
                    calendar: [
                        "Variable 'time': Required variable attribute 'calendar'  has wrong value. Should be proleptic_gregorian. Found value: proleptic gregorian",
                    ],
                },
            ],
        },
        {
            z: [
                {
                    variable: [
                        "Variable 'z' has wrong dimensions. Expected: [('traj', 'ntime')]. Found: ('traj',)",
                        "The _FillValue attribute of variable 'z' is set to nan. Must be -9999 (fixed fill value in the UC2 data standard.",
                    ],
                },
            ],
        },
        {
            x: [
                {
                    variable: [
                        "The _FillValue attribute of variable 'x' is set to nan. Must be -9999 (fixed fill value in the UC2 data standard.",
                    ],
                },
            ],
        },
        {
            y: [
                {
                    variable: [
                        "The _FillValue attribute of variable 'y' is set to nan. Must be -9999 (fixed fill value in the UC2 data standard.",
                    ],
                },
            ],
        },
        {
            lon: [
                {
                    variable: [
                        "Variable 'lon' is outside allowed range[-180.1, 180.1]. Found range: [-9999.0,13.5585246]",
                        "The _FillValue attribute of variable 'lon' is set to nan. Must be -9999 (fixed fill value in the UC2 data standard.",
                    ],
                },
            ],
        },
        {
            lat: [
                {
                    variable: [
                        "Variable 'lat' is outside allowed range[-90.1, 90.1]. Found range: [-9999.0,52.4396492]",
                        "The _FillValue attribute of variable 'lat' is set to nan. Must be -9999 (fixed fill value in the UC2 data standard.",
                    ],
                },
            ],
        },
        {
            E_UTM: [
                {
                    variable: [
                        "Variable 'E_UTM' has wrong dimensions. Expected: [('traj', 'ntime')]. Found: ('traj',)",
                        "The _FillValue attribute of variable 'E_UTM' is set to nan. Must be -9999 (fixed fill value in the UC2 data standard.",
                    ],
                },
            ],
        },
        {
            N_UTM: [
                {
                    variable: [
                        "Variable 'N_UTM' has wrong dimensions. Expected: [('traj', 'ntime')]. Found: ('traj',)",
                        "The _FillValue attribute of variable 'N_UTM' is set to nan. Must be -9999 (fixed fill value in the UC2 data standard.",
                    ],
                },
            ],
        },
        {
            crs: [
                {
                    semi_major_axis: [
                        "Variable 'crs': Required variable attribute 'semi_major_axis' has wrong type. Should be one of the following: int, float, float16, float32, float64, int8, int16, int32, int64. Found type: str",
                    ],
                },
                {
                    inverse_flattening: [
                        "Variable 'crs': Required variable attribute 'inverse_flattening' has wrong type. Should be one of the following: float, float16, float32, float64. Found type: str",
                    ],
                },
                {
                    longitude_of_prime_meridian: [
                        "Variable 'crs': Required variable attribute 'longitude_of_prime_meridian' has wrong type. Should be one of the following: int, float, float16, float32, float64, int8, int16, int32, int64. Found type: str",
                    ],
                },
                {
                    longitude_of_central_meridian: [
                        "Variable 'crs': Required variable attribute 'longitude_of_central_meridian' has wrong type. Should be one of the following: int, float, float16, float32, float64, int8, int16, int32, int64. Found type: str",
                    ],
                },
                {
                    scale_factor_at_central_meridian: [
                        "Variable 'crs': Required variable attribute 'scale_factor_at_central_meridian' has wrong type. Should be one of the following: int, float, float16, float32, float64, int8, int16, int32, int64. Found type: str",
                    ],
                },
                {
                    latitude_of_projection_origin: [
                        "Variable 'crs': Required variable attribute 'latitude_of_projection_origin' has wrong type. Should be one of the following: int, float, float16, float32, float64, int8, int16, int32, int64. Found type: str",
                    ],
                },
                {
                    false_easting: [
                        "Variable 'crs': Required variable attribute 'false_easting' has wrong type. Should be one of the following: int, float, float16, float32, float64, int8, int16, int32, int64. Found type: str",
                    ],
                },
                {
                    false_northing: [
                        "Variable 'crs': Required variable attribute 'false_northing' has wrong type. Should be one of the following: int, float, float16, float32, float64, int8, int16, int32, int64. Found type: str",
                    ],
                },
            ],
        },
        {
            traj_name: [
                {
                    cf_role: [
                        "Variable 'traj_name': Required variable attribute 'cf_role'  has wrong value. Should be trajectory_id. Found value: timeseries_id",
                    ],
                },
            ],
        },
        {
            height: [
                {
                    variable: [
                        "Variable 'height' has wrong dimensions. Expected: [(), ('traj', 'ntime')]. Found: ('traj',)",
                        "The _FillValue attribute of variable 'height' is set to nan. Must be -9999 (fixed fill value in the UC2 data standard.",
                    ],
                },
            ],
        },
        {
            time_bounds: [
                "Variable 'time_bounds' has wrong dimensions. Expected: [('traj', 'ntime', 'nv')]. Found: ('nv', 'ntime', 'traj')",
                {
                    attributes: ["Variable 'time_bounds' must not have any attributes."],
                },
                {
                    variable: [
                        "Could not check values of variable 'time_bounds' because of previous error with this variable.",
                    ],
                },
            ],
        },
        {
            mcpm: [
                {
                    coordinates: [
                        "variable attribute 'coordinates' contains a reference to a coordinate that is not found in file: {'height'}",
                    ],
                },
            ],
        },
        {
            coordinate_transform: ["Cannot check geographic coordinates because of error in 'crs' variable."],
        },
    ],
    warnings: [
        {
            cfchecks: [
                "Invalid Type for attribute: _FillValue <class 'numpy.float32'>",
                "Invalid Type for attribute: _FillValue <class 'numpy.float32'>",
                "Invalid Type for attribute: missing_value <class 'numpy.float32'>",
                "Invalid Type for attribute: _FillValue <class 'numpy.float32'>",
                "Invalid Type for attribute: _FillValue <class 'numpy.float32'>",
                "Invalid Type for attribute: missing_value <class 'numpy.float32'>",
                "Invalid Type for attribute: _FillValue <class 'numpy.float32'>",
                "Invalid Type for attribute: missing_value <class 'numpy.float32'>",
                "Invalid Type for attribute: _FillValue <class 'numpy.float32'>",
                "Invalid Type for attribute: _FillValue <class 'numpy.float32'>",
                "Invalid Type for attribute: _FillValue <class 'numpy.float32'>",
                {
                    height: [
                        'attribute missing_value attached to wrong kind of variable',
                        '(2.5.1): missing_value and _FillValue set to differing values',
                    ],
                },
                {
                    station_h: [
                        '(3.1): No units attribute set.  Please consider adding a units attribute for completeness.',
                    ],
                },
                {
                    lat: [
                        'attribute missing_value attached to wrong kind of variable',
                        '(2.5.1): missing_value and _FillValue set to differing values',
                    ],
                },
                {
                    lon: [
                        'attribute missing_value attached to wrong kind of variable',
                        '(2.5.1): missing_value and _FillValue set to differing values',
                    ],
                },
                {
                    x: [
                        'attribute missing_value attached to wrong kind of variable',
                        '(2.5.1): missing_value and _FillValue set to differing values',
                    ],
                },
                {
                    y: [
                        'attribute missing_value attached to wrong kind of variable',
                        '(2.5.1): missing_value and _FillValue set to differing values',
                    ],
                },
            ],
        },
    ],
}

export function isArray(a) {
    return !!a && a.constructor === Array
}

export function isObj(a) {
    return !!a && a.constructor === Object
}

export function build_obj(id, name, children) {
    return {
        id: id,
        name: name,
        children: children,
    }
}

export function mapper(input, start_idx) {
    let result = []
    let id = start_idx
    if (isObj(input)) {
        Object.keys(input).forEach(function(key) {
            id = id + 1
            let inner_res = mapper(input[key], id)
            let children = inner_res[0]
            let n = inner_res[1]
            let o = build_obj(id, key, children)
            result.push(o)
            id = id + n
        })
    } else if (isArray(input)) {
        input.forEach(function(elm) {
            let inner_res = mapper(elm, id)
            let objs = inner_res[0]
            let n = inner_res[1]
            if (isArray(objs)) {
                objs.forEach(function(elm) {
                    result.push(elm)
                })
            } else {
                result.push(objs)
            }
            id = id + n
        })
    } else {
        id = id + 1
        result = build_obj(id, input, [])
    }
    return [result, id - start_idx]
}
