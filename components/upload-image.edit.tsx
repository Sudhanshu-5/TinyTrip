import React from 'react'
import { Label, Box, DropZone, DropZoneProps, DropZoneItem } from '@admin-bro/design-system'
import {BasePropertyProps} from 'admin-bro'

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { property, onChange, record } = props

  const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
    onChange(property.name, files[0])
    onChange('profilePhotoLocation', files[0]?.name)
  }
  // console.log("aaaaaaaaaaaaaa"+JSON.stringify(property))
  const uploadedPhoto = record.params.profilePhotoLocation
  const photoToUpload = record.params[property.name]
  // console.log("vvvvvvvvvvvvvvvvv"+photoToUpload)

  return (
    <Box marginBottom="xxl">
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange}/>
      {uploadedPhoto && !photoToUpload && (
        <DropZoneItem src={uploadedPhoto} />
      )}
    </Box>
  )
}

export default Edit