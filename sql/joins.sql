select lastname, firstname, types.name as "type", vendors.name as "vendor", 
  serial_number, series, model, cpu, ram, hard_drive, os, graphics, 
  bluetooth, wireless, security, cdrom, state
    from hardware_owners 
    inner join hardware on hardware_owners.hardware_id=hardware.id 
    inner join users on hardware_owners.user_id=users.id
    inner join types on hardware.type_id=types.id
    inner join vendors on hardware.manufacturer=vendors.id
    inner join financial on hardware.id=financial.hardware_id

select * from departments 
  inner join users on departments.manager=users.id
  order by departments.name

